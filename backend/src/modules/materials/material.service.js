import * as repo from "./material.repository.js";

export const createMaterial = async (data) => {
  const materialId = await repo.createMaterial(data);
  return { materialId };
};

export const updateMaterial = async (id, data) => {
  const material = await repo.findMaterialById(id);
  if (!material) throw new Error("Material not found");
  await repo.updateMaterial(id, data);
  return { message: "Material updated successfully" };
};

export const deleteMaterial = async (id) => {
  const material = await repo.findMaterialById(id);
  if (!material) throw new Error("Material not found");
  await repo.deleteMaterial(id);
  return { message: "Material deleted successfully" };
};

export const getMaterialsByClass = async (classId) => {
  return await repo.findMaterialsByClass(classId);
};

export const getMaterialById = async (id) => {
  const material = await repo.findMaterialById(id);
  if (!material) throw new Error("Material not found");
  return material;
};
