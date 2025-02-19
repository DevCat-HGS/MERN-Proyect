import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState(null);

  console.log("Current params:", params);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError(null);
      
      if (params.id) {
        console.log("Updating task with ID:", params.id);
        await updateTask(params.id, {
          ...data,
          date: data.date || new Date(),
        });
      } else {
        console.log("Creating new task");
        await createTask({
          ...data,
          date: data.date || new Date(),
        });
      }
      navigate('/tasks');
    } catch (error) {
      console.log("Error details:", error.response?.data);
      setServerError(error.response?.data?.message || "An error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      try {
        if (params.id) {
          console.log("Loading task with ID:", params.id);
          setLoading(true);
          const task = await getTask(params.id);
          if (task) {
            console.log("Task loaded:", task);
            setValue("title", task.title);
            setValue("description", task.description);
            setValue(
              "date",
              task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
            );
            setValue("completed", task.completed);
          }
        }
      } catch (error) {
        console.error("Error loading task:", error);
        setServerError("Error loading task");
        navigate('/tasks');
      } finally {
        setLoading(false);
      }
    };
    loadTask();
  }, [params.id, setValue, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}

          <label htmlFor="description">Description</label>
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}

          <label htmlFor="date">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />

          {serverError && (
            <p className="text-red-500">{Array.isArray(serverError) ? serverError.join(', ') : serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 px-4 py-1 rounded-md my-2 w-full disabled:bg-indigo-400"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
