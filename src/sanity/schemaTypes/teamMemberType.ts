import { FaUserGroup } from 'react-icons/fa6';
import { defineField, defineType } from 'sanity';
import { sanitySlugifier } from './components/sanitySlugifier';
import { formatTitle } from '@/lib/utils';

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Members',
  icon: FaUserGroup,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Team Member Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-team-member`,
        slugify: sanitySlugifier,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Member Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'socialLink',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Member Bio',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'mainImage',
      position: 'position',
    },
    prepare({ name, image, position }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const positionFormatted = position
        ? formatTitle(position)
        : 'Position not provided';

      return {
        title: nameFormatted,
        subtitle: `Position: ${positionFormatted}`,
        media: image || FaUserGroup,
      };
    },
  },
});
