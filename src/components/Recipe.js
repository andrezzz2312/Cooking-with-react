import React, {useContext, useState} from 'react';
import IngredientList from './IngredientList';
import {RecipeContext} from './App';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';

export default function Recipe(props) {
  const {handleRecipeDelete, handleRecipeSelect} = useContext(RecipeContext);

  const {id, name, cookTime, servings, instructions, ingredients} = props;

  const [description, setDescription] = useState('');

  function handleDescription() {
    if (description === '') {
      setDescription('description-visible');
    } else {
      setDescription('');
    }
  }
  function handleDescriptionEdit() {
    setDescription('description-visible');
  }

  return (
    <div className='recipe'>
      <div className='recipe__header'>
        <h3 className='recipe__title ' onClick={() => handleDescription()}>
          {name}
        </h3>
        <div className='btn-recipe-edit-delete-wrapper'>
          <button
            className='btn btn--primary btn--rd'
            onClick={() => {
              // copiar este handlerecipeselect en el onclick del titulo para obtener el id del recipe necesario
              // crear un use state en recipelist donde se mande el handlerecipeselect
              // y hacer asi function handleRecipeSelect(id) {
              // setSelectedRecipeId(id);
              // }
              // mandar un prop a recipes en recipelist que defina la invisibilidad en todas las recipes con un foreach
              // y que el unico que tenga el mismo id ya pasado sea visible
              handleRecipeSelect(id);
              handleDescriptionEdit();
            }}
          >
            <FontAwesomeIcon icon={faEdit} className='edit' />
          </button>
          <button
            className='btn btn--danger btn--rd'
            onClick={() => handleRecipeDelete(id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} className='delete' />
          </button>
        </div>
      </div>
      <div className={`recipe__description ${description}`}>
        <div className='recipe__row'>
          <span className='recipe__label'>Cook Time:</span>
          <span className='recipe__value'>{cookTime}</span>
        </div>
        <div className='recipe__row'>
          <span className='recipe__label'>Servings:</span>
          <span className='recipe__value'>{servings}</span>
        </div>
        <div className='recipe__row'>
          <span className='recipe__label'>Instructions</span>
          <div className='recipe__value recipe__value--indented recipe__instructions'>
            {instructions}
          </div>
        </div>
        <div className='recipe__row'>
          <span className='recipe__label'>Ingredients:</span>
          <div className='recipe__value recipe__value--indented'>
            <IngredientList ingredients={ingredients} />
          </div>
        </div>
      </div>
    </div>
  );
}
