import { get } from "lodash";
import { ingredients } from "@/utils";
import InputComponent from "./InputComponent";

const Recipes = ({
  onChange,
  recipe,
  handling,
}: {
  onChange: (key: string, val: any) => void;
  recipe: any;
  handling: boolean;
}) => {
  return ingredients.map((ingredient, index) => {
    const { key, name, child, type, options } = ingredient;
    return (
      <div key={index} className="mb-4">
        <label htmlFor={key} className="block text-lg mb-2">
          {name}
        </label>
        {child ? (
          child.map((child, index) => {
            const { name } = child;
            return (
              <div key={index} className="mb-2">
                <label htmlFor={child.key} className="block text-sm mb-1">
                  {name}
                </label>
                <InputComponent
                  type={type as string}
                  options={child.options}
                  value={get(recipe, `${key}.${child.key}`)}
                  onChange={(val) => onChange(`${key}.${child.key}`, val)}
                  disabled={handling}
                />
              </div>
            );
          })
        ) : (
          <div>
            <InputComponent
              type={type as string}
              options={options}
              value={get(recipe, key)}
              onChange={(val) => onChange(key, val)}
            />
          </div>
        )}
      </div>
    );
  });
};

export default Recipes;
