import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import heic2any from "heic2any";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { ImageOutputFormat } from "../lib/constants";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatFileSize, stripExtension, downloadFile } from "../lib/utils";

export const FileView = ({
  file,
  onDiscard,
}: {
  file: File;
  onDiscard?: () => void;
}) => {
  const [preview, setPreview] = useState<string>("");

  const fileConvertSchema = z.object({
    name: z.string().min(1, { message: "Filename is required" }),
    type: z.string(),
  });

  const form = useForm<z.infer<typeof fileConvertSchema>>({
    resolver: zodResolver(fileConvertSchema),
    defaultValues: {
      name: stripExtension(file.name),
      type: "png",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof fileConvertSchema>> = (data) => {
    console.log(data);
    downloadFile({
      filename: data.name,
      fileType: data.type,
      file: file,
    });
  };

  useEffect(() => {
    if (file.type === "image/heic") {
      console.log("converting heic to jpeg");
      heic2any({
        blob: file,
        toType: "image/jpeg",
      }).then((blob) => {
        const url = URL.createObjectURL(blob as Blob);
        setPreview(url);
      });
    } else {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }, [file]);

  return (
    <div className="flex flex-row border justify-center p-2 border-gray-300 rounded-lg shadow-md">
      <div className="w-3/6 h-48 flex flex-col justify-center items-center">
        <img
          src={preview}
          alt="preview loading"
          className="object-contain h-40 w-96"
        />
        <p>
          {file.name} : {formatFileSize(file.size)}
        </p>
      </div>
      <div className="flex flex-row justify-center items-center space-x-2">
        <Form {...form}>
          <form className="flex flex-row space-x-2 mb-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mr-auto">New Filename</FormLabel>
                  <Input className="min-w-64" type="text" {...field} />
                  <FormMessage>
                    {form.formState.errors.name?.message || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mr-auto">Format</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="png" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ImageOutputFormat.map((format) => (
                        <SelectItem key={format} value={format}>
                          {format}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button onClick={form.handleSubmit(onSubmit)}>Convert</Button>
        {onDiscard && (
          <Button onClick={onDiscard} type="button">
            Discard
          </Button>
        )}
      </div>
    </div>
  );
};
