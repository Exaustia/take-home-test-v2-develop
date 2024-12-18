import DeleteIcon from "@mui/icons-material/Delete";

import { Ingredient } from "../../../Types/Ingredient";
import "./cardIngredient.css";

const CardIngredient = ({
  ingredient,
  handleDelete,
}: {
  ingredient: Ingredient;
  handleDelete: (ingredient: Ingredient) => void;
}) => {
  return (
    <div className="card-ingredient">
      {/* <img src="" alt={ingredient.name} /> */}
      <span>{ingredient.emoji}</span>
      <div className="card-ingredient__content">
        <p>
          <span>Name:</span> {ingredient.name}
        </p>
        <p>
          <span>Price:</span>
          {ingredient.price}$
        </p>
        <p>
          {" "}
          <span>Tag:</span> {ingredient.tag}
        </p>
      </div>

      <div className="card-ingredient__actions">
        <button
          className="delete-button"
          onClick={() => handleDelete(ingredient)}
        >
          <DeleteIcon /> Delete
        </button>
      </div>
    </div>
  );
};

export default CardIngredient;
