export const transformPolicyData = (data) => {
  return data.map((item) => ({
    id: item.id,
    ...item.data,
  }));
};