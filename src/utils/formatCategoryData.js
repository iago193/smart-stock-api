export function formatCategoryData(data) {
  return {
    name: data.name?.trim() || '',
    description: data.description?.trim() || null,
  };
}
