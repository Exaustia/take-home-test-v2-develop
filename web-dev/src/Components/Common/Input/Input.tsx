import "./input.css";

interface InputProps {
  value: string | number;
  onChange: (e: any) => void;
  label: string;
  placeholder: string;
  type: "text" | "password" | "email" | "number";
  name: string;
}

const Input = (props: InputProps) => {
  return (
    <div className="input-container">
      <label htmlFor="name" className="input-label">
        {props.label}
      </label>
      <input
        required
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
        id={props.name}
        onChange={props.onChange}
        className="input-field"
      />
    </div>
  );
};

export default Input;
