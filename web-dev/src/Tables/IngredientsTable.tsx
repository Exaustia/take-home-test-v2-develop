import { Ingredient } from "../Types/Ingredient";
import { useMutationIngredientDelete } from "../Hooks/Mutation/IngredientsMutation";
import CardIngredient from "../Components/Card/CardIngredient/CardIngredient";

import "./table.css";

export function IngredientTable({
  ingredients,
}: {
  ingredients: Ingredient[];
}): JSX.Element {
  const { mutateAsync: deleteIngredient } = useMutationIngredientDelete();

  const handlerButtonDelete = async (ingredient: Ingredient) => {
    await deleteIngredient(ingredient.id);
  };

  return (
    <div className="container">
      <div className="ingredients-list">
        {ingredients.map((row) => (
          <CardIngredient
            key={row.id}
            ingredient={row}
            handleDelete={handlerButtonDelete}
          />
        ))}
      </div>
    </div>
  );
}
