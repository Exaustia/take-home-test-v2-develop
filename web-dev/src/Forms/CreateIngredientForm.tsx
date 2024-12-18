import "./styles.css";

import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

import { useMutationIngredientCreate } from "../Hooks/Mutation/IngredientsMutation";

import SecondaryBtn from "../Components/Button/SecondaryBtn";
import Input from "../Components/Common/Input/Input";
import Select from "../Components/Common/Select/Select";
import { Ingredient } from "../Types/Ingredient";

interface CreateIngredientFormProps {
  handleAddNewIngredient: (ingredient: Ingredient) => void;
  onClose: () => void;
}

export function CreateIngredientForm({
  handleAddNewIngredient,
  onClose,
}: CreateIngredientFormProps): JSX.Element {
  const { mutateAsync: createIngredient } = useMutationIngredientCreate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [emoji, setEmoji] = useState<string>("🍖");
  const [tag, setTag] = useState<string>("meat");

  const resetFields = () => {
    setName("");
    setPrice(0);
  };

  const handlerSubmitNewIngredient = async () => {
    if (
      name === undefined ||
      name === "" ||
      price === undefined ||
      emoji === undefined ||
      tag === undefined
    ) {
      alert("Please fill all the fields");
      return;
    }
    const { data, status } = await createIngredient({
      name,
      price,
      emoji,
      tag,
    });
    if (status === 200) handleAddNewIngredient(data);

    resetFields();
    onClose();
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const target = event.target as HTMLInputElement;
    setEmoji(target.value);
  };

  return (
    <div id="create-recipes-form">
      <h2>New ingredient</h2>
      <section>
        <div className="input-content">
          <div className="input-content__select">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name of the ingredient"
              name="ingredient"
              placeholder="Ingredient name"
              type="text"
            />
          </div>

          <div className="input-content__select">
            <Input
              value={price}
              name="Price"
              onChange={(e) =>
                e.target.value ? setPrice(Number(e.target.value)) : setPrice(0)
              }
              label="Price*"
              placeholder="0"
              type="number"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="input-content">
          <div className="input-content__select">
            <Select
              value={emoji || ""}
              label="Emoji"
              name="emoji"
              placeholder="Select an emoji"
              onChange={(e) => handleChange(e)}
              options={[
                { value: "🍖", label: "🍖" },
                { value: "🥒", label: "🥒" },
                { value: "🍔", label: "🍔" },
                { value: "🍔", label: "🍔" },
              ]}
            />
          </div>
          <div className="input-content__select">
            <Select
              value={tag || ""}
              label="Tags"
              name="tags"
              onChange={(e) => setTag(e.target.value)}
              placeholder="Select an Tag"
              // quick simple but not the best way to do it with typescript

              options={[
                { value: "meat", label: "meat" },
                { value: "legume", label: "legume" },
                { value: "protein", label: "protein" },
                { value: "starchy", label: "starchy" },
              ]}
            />
          </div>
        </div>
      </section>
      <span className="SmallTextExplanation">
        *Keep in mind that the price is for one person. Prices are multiplied by
        the number of people in the recipe.
      </span>
      <section>
        <SecondaryBtn
          onClick={handlerSubmitNewIngredient}
          label="Submit"
        ></SecondaryBtn>
      </section>
    </div>
  );
}
