import React from 'react';
import './ImageOptions.scss';
import { FaCheckCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

/* Interactable options to be displayed as images in the pizza builder */
const ImageOptions = (props) => {
  return (
    <div className='builder-options'>
      {Object.keys(props.imageMapping).map((option) => {
        const selected = props.itemSelected === option;
        let additionalDisplay = null;
        if (props.selectionMetadata && props.selectionMetadata[option]) {
          additionalDisplay = props.selectionMetadata[option].additionalDisplay;
        }
        return (
          <div
            key={option}
            onClick={props.onClick}
            className='option'
            data-value={option}
          >
            {selected ? <FaCheckCircle className='option__checkmark' /> : null}
            <img
              className='option__img'
              src={props.imageMapping[option].icon}
              alt={option}
            />
            <div
              className={
                selected
                  ? 'option__name option__name--selected'
                  : 'option__name'
              }
            >
              {option} {additionalDisplay}
            </div>
          </div>
        );
      })}
    </div>
  );
};

ImageOptions.propTypes = {
  imageMapping: PropTypes.objectOf(PropTypes.object).isRequired,
  itemSelected: PropTypes.string.isRequired,
  selectionMetadata: PropTypes.objectOf(PropTypes.object),
};

export default ImageOptions;
