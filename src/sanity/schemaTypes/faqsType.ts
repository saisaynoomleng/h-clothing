import { FaQuestion } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';

export const faqsType = defineType({
  name: 'faq',
  title: 'FAQs',
  type: 'document',
  icon: FaQuestion,
  fields: [
    defineField({
      name: 'name',
      title: 'FAQ title',
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
      name: 'faqs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
});
