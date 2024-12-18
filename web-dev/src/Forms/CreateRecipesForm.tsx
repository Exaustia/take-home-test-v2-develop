import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CardCustom } from "../Components/CardCustom";
import { Loader } from "../Components/Loader";
import { useMutationRecipeCreate } from "../Hooks/Mutation/RecipeMutation";
import { useQueryIngredientList } from "../Hooks/Query/IngredientQuery";
import { ErrorPage } from "../Pages/ErrorPage";
import { Ingredient } from "../Types/Ingredient";
import { OptionsMultiSelectType } from "../Types/OptionsMultiSelect";

export function CreateRecipesForm(): JSX.Element {
  const [name, setName] = useState("");
  const [timeToCook, setTimeToCook] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const [selectedIngredients, setSelectedIngredients] = useState<
    OptionsMultiSelectType[]
  >([]);
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const { mutateAsync: createRecipe } = useMutationRecipeCreate();
  const { data: ingredients, status, isLoading } = useQueryIngredientList();

  useEffect(() => {
    if (ingredients) {
      setIngredientsList(ingredients);
    }
  }, [ingredients]);

  const resetFields = () => {
    setName("");
    setTimeToCook(0);
    setNumberOfPeople(0);
    setSelectedIngredients([]);
  };

  const handleAddSelectedIngredient = (value: OptionsMultiSelectType[]) => {
    const excludeMeatIngredient = ingredientsList.filter((i) => {
      return i.tag === "meat";
    });

    const excludeStarchyIngredient = ingredientsList.filter((i) => {
      return i.tag === "starchy";
    });

    const isContainExcludeMeatIngredient =
      value.filter((v) => {
        return excludeMeatIngredient.find((e) => e.id === v.id);
      }).length > 1;

    const isContainExcludeStarchyIngredient =
      value.filter((v) => {
        return excludeStarchyIngredient.find((e) => e.id === v.id);
      }).length > 1;

    if (isContainExcludeMeatIngredient) {
      alert("You have already selected a meat ingredient");
      return;
    }
    if (isContainExcludeStarchyIngredient) {
      alert("You have already selected a starchy ingredient");
      return;
    }

    setSelectedIngredients(value);
  };

  const handlerSubmitNewRecipe = async () => {
    if (!name || !timeToCook || !numberOfPeople || !selectedIngredients) {
      alert("Please fill all the fields");
      return;
    }

    await createRecipe({
      name,
      timeToCook,
      numberOfPeople,
      ingredients: selectedIngredients.map((e) => e.id),
    });

    resetFields();
  };

  if (status === "error") {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="create-recipes-form">
      <Box
        display="flex"
        justifyContent="space-between"
        className="MarginTop16Px"
      >
        <CardCustom isSmall>
          <h2>New recipe</h2>
          <FormControl fullWidth margin="normal">
            <TextField
              id="name-recipe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name of the recipe"
              variant="outlined"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            {/* on peut mettre plusieurs fois le même ingrédient dans le formulaire mais après ça l'enregistre qu'une fois*/}
            <Autocomplete
              onChange={(_e, value: OptionsMultiSelectType[]) => {
                handleAddSelectedIngredient(value);
              }}
              value={selectedIngredients}
              multiple
              id="combo-box-demo"
              options={ingredientsList.map((e: Ingredient) => {
                return { label: e.name, id: e.id };
              })}
              renderInput={(params: any) => (
                <TextField {...params} label="Ingredients" />
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              value={timeToCook}
              onChange={(e) =>
                e.target.value
                  ? setTimeToCook(Number(e.target.value))
                  : setTimeToCook(0)
              }
              id="name-recipe"
              label="Time to cook"
              variant="outlined"
              type="number"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              value={numberOfPeople}
              onChange={(e) =>
                e.target.value
                  ? setNumberOfPeople(Number(e.target.value))
                  : setNumberOfPeople(0)
              }
              id="name-recipe"
              label="Number of people"
              variant="outlined"
              type="number"
              fullWidth
            />
          </FormControl>
          <FormControl margin="normal">
            <Button onClick={handlerSubmitNewRecipe} variant="contained">
              Submit
            </Button>
          </FormControl>
        </CardCustom>
      </Box>
    </div>
  );
}
