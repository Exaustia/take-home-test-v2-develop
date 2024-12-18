import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useQueryIngredientList } from "../Hooks/Query/IngredientQuery";
import { Loader } from "../Components/Loader";
import { ErrorPage } from "./ErrorPage";
import { IngredientTable } from "../Tables/IngredientsTable";
import { CreateIngredientForm } from "../Forms/CreateIngredientForm";
import { Ingredient } from "../Types/Ingredient";

import "./page.css";
import { useModal } from "../Modals/ModalProvider";
import PrimaryBtn from "../Components/Button/PrimaryBtn";

export function IngredientPage(): JSX.Element {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const { data, status, isLoading } = useQueryIngredientList();
  const { setModal } = useModal();

  // One => When the API set OK => add the ingredient to the list
  // Two => When the API set OK => call the API again to get the new list of ingredients (But, that means fetch all ingredients again)
  // Three => When the API set OK => The API send the new ingredient in the response, so we can add it to the list

  useEffect(() => {
    if (status === "success") {
      setIngredients(data);
    }
  }, [data, status]);

  const handleAddNewIngredient = (ingredient: Ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  if (status === "error") {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="recipes-pages">
      <div className="top-title">
        <h1>MY INGREDIENTS</h1>
        <PrimaryBtn
          label={"Create new ingredient"}
          onClick={() =>
            setModal({
              open: true,
              component: (
                <CreateIngredientForm
                  onClose={() => setModal({ open: false })}
                  handleAddNewIngredient={handleAddNewIngredient}
                />
              ),
            })
          }
        ></PrimaryBtn>
      </div>

      <Box display={"flex"} gap={2}>
        <IngredientTable ingredients={ingredients} />
      </Box>
    </div>
  );
}
