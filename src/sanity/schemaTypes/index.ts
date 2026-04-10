import { type SchemaTypeDefinition } from 'sanity';
import { blockContentType } from './components/blockContentType';
import { blockImageType } from './components/blockImageType';
import { productCategoryType } from './productCategoryType';
import { productColorType } from './productColorType';
import { productSizeType } from './productSizeType';
import { productBrandType } from './productBrandType';
import { productTagType } from './productTagType';
import { productType } from './productType';
import { teamMemberType } from './teamMemberType';
import { authorType } from './authorType';
import { careerType } from './careerType';
import { faqsType } from './faqsType';
import { utilityPageType } from './utitlityPageType';
import { blogCategoryType } from './blogCategoryType';
import { blogType } from './blogType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    blockImageType,
    productCategoryType,
    productColorType,
    productSizeType,
    productBrandType,
    productTagType,
    productType,
    teamMemberType,
    authorType,
    careerType,
    faqsType,
    utilityPageType,
    blogCategoryType,
    blogType,
  ],
};
