import { getProjectById } from "@/api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function EditProjectView() {
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId], //Agregar este segundo parametro para que identifique cada projectId cuando se haga clic
    queryFn: () => getProjectById(projectId), //cuando se tiene una función que tiene parametro, agregar un callback
    retry: false // el default es que intente 3 veces
  });

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data) return <EditProjectForm data={data} projectId={projectId} />;
}
