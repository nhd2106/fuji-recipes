import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const InputComponent = ({
  type,
  options,
  onChange,
  value,
  defaultValue,
  disabled,
  ...props
}: {
  type: string;
  options?: any[];
  defaultValue?: any;
  value?: any;
  onChange?: (val: any) => void;
  disabled?: boolean;
}) => {
  switch (type) {
    case "select":
      return (
        <Select
          onValueChange={(value) => {
            onChange && onChange(value);
          }}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue>{value || "choose your option"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {(options || []).map((value, i) => (
              <SelectItem key={i} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "checkbox":
      return (
        <Switch
          {...props}
          onChange={(e: any) => {
            onChange && onChange(e.target?.checked);
          }}
          checked={value}
          disabled={disabled}
        />
      );
    default:
      break;
  }
};

export default InputComponent;
