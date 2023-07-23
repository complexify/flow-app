import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

const settingsFormSchema = z.object({
  theme: z.string().optional(),
  experimental_features: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<SettingsFormValues> = {
  experimental_features: false,
};

const SettingsContent: React.FC = ({}) => {
  const { theme, setTheme } = useTheme();

  // Function to handle theme changes upon selection
  const handleThemeChange = (value: any) => {
    setTheme(value);
    toast({
      title: "Theme updated successfully!",
      description: "Changed to: " + value,
    });
  };

  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  });

  function onSubmit(data: SettingsFormValues) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div>
              <h3 className="mb-4 text-lg font-medium">Settings</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="">
                        <FormLabel className="text-base">Theme</FormLabel>
                        <FormDescription>
                          Adjust how you want the app to look.
                        </FormDescription>
                      </div>

                      <Select
                        onValueChange={(value) => {
                          // Call the function to handle theme change
                          handleThemeChange(value);
                          // Update the form field value
                          field.onChange(value);
                        }}
                        defaultValue={theme} // Use the selected theme from state
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={theme} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                      {/* <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experimental_features"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Experimental Features
                        </FormLabel>
                        <FormDescription>
                          Use features that aren't complete.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled
                          aria-readonly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </motion.div>
    </AnimatePresence>
  );
};
export default SettingsContent;
