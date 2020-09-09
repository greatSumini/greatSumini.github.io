import React, { useState } from 'react';
import styled from 'styled-components';

import TagCard from 'components/molecules/TagCard';
import theme from 'styles/theme';

export type Tag = {
  tag: string;
  totalCount: number;
};

export type TagsSectionProps = {
  tags: Tag[];
  selectedTag: string;
  selectTag: React.Dispatch<React.SetStateAction<string>>;
};

export default function TagsSection({
  tags,
  selectedTag,
  selectTag,
}: TagsSectionProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Wrapper>
      <TagsWrapper isOpen={isOpen}>
        {tags?.map(({ tag, totalCount }) => (
          <TagCard
            key={tag}
            label={tag}
            count={totalCount}
            size="large"
            selected={tag === selectedTag}
            routing={false}
            onClick={() => {
              selectTag(tag === 'all' || tag === selectedTag ? '' : tag);
            }}
          />
        ))}
      </TagsWrapper>
      {!isOpen && (
        <>
          <ShowMoreGradient />
          <ShowMoreButton
            onClick={() => {
              setOpen(true);
            }}
          >
            show all tags
          </ShowMoreButton>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  position: relative;
  margin-bottom: 1.5rem;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 16px;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1rem;
  overflow: hidden;
  height: fit-content;
  ${(props: { isOpen: boolean }) => `
    max-height: ${props.isOpen ? 'auto' : '130px'};
  `}
`;

const ShowMoreButton = styled.div`
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 10;
  background-color: white;
  width: fit-content;
  font-weight: 500;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: none;
  ${theme.media.phone`
    display: flex;
  `}
`;

const ShowMoreGradient = styled.div`
  position: absolute;
  display: block;
  width: 100%;
  height: 36px;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);
  content: '';
`;
