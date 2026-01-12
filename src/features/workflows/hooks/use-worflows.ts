import { useTRPC } from '@/trpc/client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { userWorkglowsParms } from './use-worflows-params';

export const useSupenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = userWorkglowsParms();
  return useSuspenseQuery(
    trpc.workflows.getMany.queryOptions(params), // passa undefined como input
  );
};

export const userCreateWorflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`worflow ${data.name} created`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(`falied to create worflow: ${error.message}`);
      },
    }),
  );
};

export const useRemoveWorflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: (data) => {
        toast.success(`workflow "${data.name}" deleted`);

        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));

        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryFilter({ id: data.id }),
        );
      },
    }),
  );
};

export const useSupenseWorkflow = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(
    trpc.workflows.getOne.queryOptions({ id }), // passa undefined como input
  );
};

export const userUpdateWorflowName = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  return useMutation(
    trpc.workflows.updateName.mutationOptions({
      onSuccess: (data) => {
        toast.success(`worflow ${data.name} updated`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id }),
        );
      },
      onError: (error) => {
        toast.error(`falied to update worflow: ${error.message}`);
      },
    }),
  );
};

export const useUpdateWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  return useMutation(
    trpc.workflows.update.mutationOptions({
      onSuccess: (data) => {
        toast.success(`worflow ${data.name} updated`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id }),
        );
      },
      onError: (error) => {
        toast.error(`falied to save worflow: ${error.message}`);
      },
    }),
  );
};
