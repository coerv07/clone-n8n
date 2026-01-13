'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/* =========================
   Schema
========================= */

const formSchema = z.object({
  endpoint: z.string().url('Please enter a valid URL'),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  body: z.string().optional(),
});

export type FormType = z.infer<typeof formSchema>;

/* =========================
   Props
========================= */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: FormType) => void;
  defaultEndpoint?: string;
  defaultMethod?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  defaultBody?: string;
}

/* =========================
   Component
========================= */

export const HttpRequestDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultEndpoint,
  defaultMethod = 'GET',
  defaultBody,
}: Props) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endpoint: defaultEndpoint ?? '',
      method: defaultMethod,
      body: defaultBody ?? '',
    },
  });

  const method = form.watch('method');
  const showBodyField = method !== 'GET' && method !== 'DELETE';

  const handleSubmit = (values: FormType) => {
    onSubmit?.(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>
            Configure settings for the HTTP request.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-4"
          >
            {/* METHOD */}
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    HTTP method used for the request.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ENDPOINT */}
            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://api.example.com/data"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Use {'{{variable}}'} for dynamic URLs or {'{{json}}'} to
                    stringify objects.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* BODY */}
            {showBodyField && (
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='{"key": "value"}'
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      JSON or templated values using {'{{variable}}'}.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
