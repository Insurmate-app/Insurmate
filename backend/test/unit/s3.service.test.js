/*
 * S3 Service Unit Tests
 *
 * This file contains unit tests for the S3 Service module which handles:
 * - checking file existence
 * - file upload
 * - file deletion
 * - file viewing via generation of a signed URL
 *
 * Dependencies:
 * - s3.service.js: Core user management functions
 * - errorUtil.js: Custom error handling
 * - aws-sdk/lib-storage: file upload to server
 * - aws-sdk/s3-request-presigner: Signed URL generation
 * - pdf-parse: pdf text extraction
 * - llm.service.js: document validation
 * - aws-sdk/client-s3: S3 API
 * - asset.service.js: updating assets in database
 * - logger.js: logging errors
 */


// dummy env variables
process.env.AWS_REGION = 'us-east-1';
process.env.AWS_BUCKET_NAME = 'fake-bucket';
process.env.AWS_ACCESS_KEY_ID = 'fake-key';
process.env.AWS_SECRET_ACCESS_KEY = 'fake-secret';
process.env.GROQ_API_KEY = 'fake-groq-key';

//mock pdf-parse response
jest.mock("pdf-parse", () => jest.fn().mockResolvedValue({ text: "mock pdf text" }));

// presents a mocked signed url
jest.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: jest.fn().mockResolvedValue("https://signed.url")
}));

// dependencies
const { S3Client, ListObjectsV2Command, PutObjectCommand, HeadObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Service = require("../../services/s3.service");
const assetService = require("../../services/asset.service");
const { mockClient } = require("aws-sdk-client-mock");

// mocks the response from analyzeDocument in llm.service
jest.mock("../../services/llm.service", () => ({
  analyzeDocument: jest.fn().mockResolvedValue({ valid: true, policyNumber: "12345", reason: "" })
}));

// mocks the responses from getAssetById, updateAssetWhileUploadingDocument
jest.mock("../../services/asset.service", () => ({
  getAssetById: jest.fn().mockResolvedValue({ data: { fileName: "assetId.pdf" } }),
  updateAssetWhileUploadingDocument: jest.fn(),
  updateAsset: jest.fn()
}));

const s3Mock = mockClient(S3Client);
beforeEach(() => s3Mock.reset());

describe("s3.service.js", () => {

  // Unit tests for listFiles()
  describe("listFiles", () => {
    it("should list files successfully", async () => {
      // Mock the S3 response to return file.pdf
      s3Mock.on(ListObjectsV2Command).resolves({ Contents: [{ Key: "file1.pdf", LastModified: "2025-01-01" }] });
      const files = await s3Service.listFiles("file1");

      expect(files.length).toBe(1);
      expect(files[0].filename).toBe("file1.pdf");
    });

    it("should return an empty array when no files found", async () => {
      // Mock the S3 reposne to return no files
      s3Mock.on(ListObjectsV2Command).resolves({ Contents: [] });
      const files = await s3Service.listFiles("noFile");

      expect(files).toEqual([]);
    });
  });

  //Unit tests for uploadFile()
  describe("uploadFile", () => {
    it("should upload file successfully with valid analysis", async () => {
      // Simulate successful S3 upload response
      s3Mock.on(PutObjectCommand).resolves({});

      // Call the service with a mock PDF file and dummy metadata
      const result = await s3Service.uploadFile({ buffer: Buffer.from("%PDF-1.4\n"), mimetype: "application/pdf" }, "email", "assetId");

      expect(result.message).toBe("Successfully Uploaded using Multipart Upload");
    });

    it("should throw error when file is missing", async () => {
      await expect(s3Service.uploadFile(null, "email", "assetId")).rejects.toThrow("No file provided");
    });

    it("should handle upload failure", async () => {
      // Mock S3 response to return Upload Failed status
      s3Mock.on(PutObjectCommand).rejects(new Error("Upload failed"));
      
      // call the service with a mock PDF file and metadata
      const result = s3Service.uploadFile({ buffer: Buffer.from("%PDF-1.4\n"), mimetype: "application/pdf" }, "email", "assetId");

      await expect(result).rejects.toThrow("Upload Failed");
    });
  });

  //Unit tests for fileExists()
  describe("fileExists", () => {
    it("should return true if file exists", async () => {
      // Mock S3 response to return successful response
      s3Mock.on(HeadObjectCommand).resolves({});

      // call the service method with dummy file name
      const exists = await s3Service.fileExists("assetId.pdf");

      expect(exists).toBe(true);
    });

    it("should return false if file does not exist", async () => {
      // Mock S3 response to return Not Found response
      s3Mock.on(HeadObjectCommand).rejects({ name: "NotFound" });

      // call the service method with dummy file name
      const exists = await s3Service.fileExists("nonexistent.pdf");

      expect(exists).toBe(false);
    });
  });

  // Unit testing for generateSignedUrl()
  describe("generateSignedUrl", () => {
    it("should throw error if file does not exist", async () => {
      // mock just getAssetById w/ return value assetId.pdf
      jest.spyOn(assetService, 'getAssetById').mockResolvedValue({ data: { fileName: 'assetId.pdf' } });
      jest.spyOn(s3Service, 'fileExists').mockResolvedValue(false);

      await expect(s3Service.generateSignedUrl("email", "assetId")).rejects.toThrow("File not found");
    });

    it("should generate signed URL", async () => {
      // mock just getAssetById w/ return assetId.pdf
      jest.spyOn(assetService, 'getAssetById').mockResolvedValue({ data: { fileName: 'assetId.pdf' } });
      jest.spyOn(s3Service, 'fileExists').mockResolvedValue(true);
      
      // call the service method with dummy data
      const result = await s3Service.generateSignedUrl("email", "assetId");

      expect(result.url).toBe("https://signed.url");
    });

    it("should handle error during signed URL generation", async () => {
      // mock getSignedUrl to throw an error the next time its called
      getSignedUrl.mockRejectedValueOnce(new Error("Sign URL fail"));
      
      // mock just get AssetById w/ return assetId.pdf
      jest.spyOn(assetService, 'getAssetById').mockResolvedValue({ data: { fileName: 'assetId.pdf' } });
      jest.spyOn(s3Service, 'fileExists').mockResolvedValue(true);

      await expect(s3Service.generateSignedUrl("email", "assetId")).rejects.toThrow("Unable to generate signed URL");
    });
  });

  // Unit testing for deleteFile()
  describe("deleteFile", () => {

    it("should throw error if file does not exist", async () => {
      // mock just getAssetById w/ return assetId.pdf
      jest.spyOn(assetService, 'getAssetById').mockResolvedValue({ data: { fileName: 'assetId.pdf' } });
      jest.spyOn(s3Service, 'fileExists').mockResolvedValue(false);

      await expect(s3Service.deleteFile("email", "assetId")).rejects.toThrow("File not found: assetId.pdf");
    });

    it("should delete file successfully", async () => {
      // mock just getAssetById w/ return assetId.pdf
      jest.spyOn(assetService, 'getAssetById').mockResolvedValue({ data: { fileName: 'assetId.pdf' } });
      jest.spyOn(s3Service, 'fileExists').mockResolvedValue(true);

      // mock successful response from S3 on DeleteObjectCommand
      s3Mock.on(DeleteObjectCommand).resolves({});

      // call service method with dummy data
      const result = await s3Service.deleteFile("email", "assetId");

      expect(result.message).toBe("File deleted successfully");
    });

    it("should handle error during deletion", async () => {
      // mock just getAssetById w/ return assetId.pdf
      jest.spyOn(assetService, 'getAssetById').mockResolvedValue({ data: { fileName: 'assetId.pdf' } });
      jest.spyOn(s3Service, 'fileExists').mockResolvedValue(true);

      // mock Delete failed status from S3 on DeleteObjectCommand
      s3Mock.on(DeleteObjectCommand).rejects(new Error("Delete failed"));

      await expect(s3Service.deleteFile("email", "assetId")).rejects.toThrow("Delete failed");
    });
  });
});
