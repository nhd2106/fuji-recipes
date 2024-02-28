import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import _ from "lodash";

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
  const [open, setOpen] = useState(false);
  if (type === "comboBox") {
    console.log(value);
  }
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
    case "comboBox":
      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? (options || []).find(
                    (option) => _.lowerCase(option) === _.lowerCase(value)
                  )
                : "Máy ảnh..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Chọn máy ảnh..." />
              <CommandEmpty>Không tìm thấy</CommandEmpty>
              <CommandGroup>
                {(options || []).map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={(currentValue) => {
                      if (onChange) {
                        onChange(currentValue);
                        setOpen(false);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        _.lowerCase(value) === _.lowerCase(option)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      );

    default:
      break;
  }
};

export default InputComponent;
