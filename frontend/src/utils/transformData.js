export const transformPolicyData = (data) => {
  return data.flatMap((item) => ({
    id: item.id,
    accountManager: item.accountManager,
    ...item.data,
  }));
};
