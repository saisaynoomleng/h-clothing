import { SiNike } from 'react-icons/si';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';
import { formatTitle } from '@/lib/utils';

export const productBrandType = defineType({
  name: 'productBrand',
  title: 'Product Brands',
  icon: SiNike,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-product-brand`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Brand Logo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'mainImage',
    },
    prepare({ name, image }) {
      const nameFormatted = name
        ? formatTitle(name)
        : 'Brand Name not provided';

      return {
        title: nameFormatted,
        media: image || SiNike,
      };
    },
  },
});
