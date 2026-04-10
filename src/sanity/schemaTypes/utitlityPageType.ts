import { CiTextAlignJustify } from 'react-icons/ci';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';

export const utilityPageType = defineType({
  name: 'utilityPage',
  title: 'Utility Pages',
  icon: CiTextAlignJustify,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Page Name',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-faq`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Page Text',
      validation: (rule) => rule.required(),
      type: 'blockContent',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'SEO Title',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'desc',
          title: 'Description',
          type: 'text',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
});
