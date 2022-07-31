import type { Descriptor, FontFace } from '../../types';
import { putFace, putFamily, putFile } from '../db';
import { getFacesByFamilyName, getFamilies, getFontDescriptor } from '../ipc';

export const storeFamilies = async (families: string[]) => {
  for (const familyName of families) {
    await putFamily(familyName).catch((err) => console.warn(familyName, err));
  }
};

export const getFacesByFamilies = async (families: string[]) => {
  const result: FontFace[] = [];
  for (const familyName of families) {
    const faces = await getFacesByFamilyName(familyName);
    result.push(...faces);
  }
  return result;
};

export const storePaths = async (faces: FontFace[]) => {
  for (const face of faces) {
    await putFile(face.path, 'source').catch((err) =>
      console.warn(face.path, err)
    );
  }
};

export const getDescriptors = async (faces: FontFace[]) => {
  const result: (FontFace & Descriptor)[] = [];
  for (const face of faces) {
    const descriptor = await getFontDescriptor(face);
    result.push({ ...face, ...descriptor });
  }
  return result;
};

export const storeDescriptors = async (
  descriptors: (FontFace & Descriptor)[]
) => {
  for (const descriptor of descriptors) {
    await putFace(descriptor).catch((err) => console.warn(err));
  }
};

export const setup = async () => {
  const families = await getFamilies();
  await storeFamilies(families);
  const faces = await getFacesByFamilies(families);
  await storePaths(faces);
  const descriptors = await getDescriptors(faces);
  await storeDescriptors(descriptors);
};
