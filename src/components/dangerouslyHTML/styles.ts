import styled from 'styled-components';

export const StyledDangerouslyHTML = styled.div`
  img {
    width: 100%;
  }

  ol {
    padding-left: 1rem;
  }

  ul {
    padding-left: 1.2rem;
  }

  p {
    margin: 0px !important;
  }

  .ck-table-resized {
    width: 100%;

    td {
      padding: 0.4em;
    }
  }

  .ck-table-resized,
  col,
  tr {
    border: 1px solid #bfbfbf;
  }

  .media {
    text-align: center;
    clear: both;
  }

  .image {
    text-align: center;
    margin: auto;
    width: 100% !important;
  }

  .image-style-block-align-right {
    text-align: right;
  }

  .image-style-block-align-left {
    text-align: left;
  }

  .image-style-align-right {
    float: right;
    margin-top: 0;
  }

  .image-style-align-left {
    float: left;
    margin-top: 0;
  }

  .clear-both {
    clear: both;
  }

  .text-tiny {
    font-size: 0.7em;
  }

  .text-small {
    font-size: 0.85em;
  }

  .text-big {
    font-size: 1.4rem;
  }

  .text-huge {
    font-size: 1.8em;
  }

  .pen {
    &-red {
      background-color: transparent;
      color: red;
    }

    &-green {
      background-color: transparent;
      color: green;
    }
  }

  .marker {
    &-yellow {
      background-color: yellow;
    }

    &-green {
      background-color: green;
    }

    &-blue {
      background-color: blue;
    }

    &-pink {
      background-color: pink;
    }
  }

  .video-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
  }

  .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
