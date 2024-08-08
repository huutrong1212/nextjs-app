'use client';

import React, { useCallback, useEffect, useState } from 'react';
import * as Styled from './styles';

interface DangerouslyHTMLProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  content?: string;
}

const DangerouslyHTML = ({ content, ...props }: DangerouslyHTMLProps) => {
  const [contentFormatted, setContentFormatted] = useState(content ?? '');

  const findUrlOfMedia = (contentText: string) => {
    const regexUrl = /<oembed[^>]*url="([^"]+)"><\/oembed>/;
    const match = contentText.match(regexUrl) ?? '';
    const urlMatch = /url="([^"]+)"/.exec(match[0]);

    return urlMatch ? urlMatch[1] : '';
  };

  const findIdOfMedia = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length == 11 ? match[2] : 'error';
  };

  const convertToIframeElement = useCallback((url: string) => {
    const videoId = findIdOfMedia(url);
    return `<div class="video-wrapper"><iframe width="500" height="500" src="//www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></div>`;
  }, []);

  const convertToMediaEmbed = useCallback(
    (contentText: string) => {
      let newContentText = contentText;
      const regexEmbedElement = /<oembed[^>]*url="([^"]+)"><\/oembed>/g;
      const matches = newContentText.match(regexEmbedElement);

      (matches ?? []).forEach((match) => {
        const url = findUrlOfMedia(match);
        const iframe = convertToIframeElement(url);

        newContentText = newContentText.replace(match, iframe);
      });

      setContentFormatted(newContentText);
    },
    [convertToIframeElement],
  );

  useEffect(() => {
    content && convertToMediaEmbed(content);
  }, [content, convertToMediaEmbed]);

  return (
    <Styled.StyledDangerouslyHTML>
      <div dangerouslySetInnerHTML={{ __html: contentFormatted ?? '' }} {...props} />
      <div className="clear-both" />
    </Styled.StyledDangerouslyHTML>
  );
};

export default DangerouslyHTML;
