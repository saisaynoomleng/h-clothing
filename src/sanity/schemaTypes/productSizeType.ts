import { IoMdResize } from 'react-icons/io';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';

export const productSizeType = defineType({
  name: 'productSize',
  title: 'Product Sizes',
  type: 'document',
  icon: IoMdResize,
  fields: [
    defineField({
      name: 'name',
      title: 'Size Name',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-product-size`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
