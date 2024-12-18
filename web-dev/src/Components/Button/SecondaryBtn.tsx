import c from "classnames";
import Loading from "../Common/Loading";

import "./secondaryBtn.css";

const SecondaryBtn = ({
  label,
  onClick,
  className,
  disabled,
  loading,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={c(
        className || "",
        {
          "secondary-btn_not-allowed": disabled,
          "secondary-btn_allowed": !disabled,
        },
        "secondary-btn"
      )}
    >
      {loading ? <Loading size={12} /> : label}
    </button>
  );
};

export default SecondaryBtn;
