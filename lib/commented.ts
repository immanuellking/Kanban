// export const editTask = async (values: TaskType, prevVal: Task) => {
//   // console.log(values);
//   // console.log("Prev Values", prevVal);

//   if (values.column_id === prevVal.column_id) {
//     if (values.title !== prevVal.title) {
//       await Task.findByIdAndUpdate(prevVal._id, {
//         description: values.description,
//         title: values.title,
//       });
//     }
//     if (values.subtasks.length === 0) {
//       await Promise.all(
//         prevVal.subTasks.map((subTask) =>
//           SubTask.findByIdAndDelete(subTask._id)
//         )
//       );
//       await Task.findByIdAndUpdate(prevVal._id, {
//         subTask: [],
//       });
//     } else {
//       console.log("in it");

//       const subtaskNames = new Set(
//         values.subtasks.map((subtask) => subtask.subtask_name.trim())
//       );
//       const existingSubtaskIdsToKeep = [];
//       const existingSubtaskNames = new Set();

//       for (let subtask of prevVal.subTasks) {
//         if (subtaskNames.has(subtask.subtask.trim())) {
//           existingSubtaskIdsToKeep.push(subtask._id);
//           existingSubtaskNames.add(subtask.subtask.trim());
//         } else {
//           // Remove subtask if it's not in the form data
//           await SubTask.findByIdAndDelete(subtask._id);
//           await Task.findByIdAndUpdate(
//             prevVal._id,
//             {
//               $pull: { subTasks: subtask._id },
//             },
//             { new: true }
//           );
//         }
//       }

//       for (let subtask of values.subtasks) {
//         const trimmedName = subtask.subtask_name.trim();
//         if (!existingSubtaskNames.has(trimmedName)) {
//           let existingSubtask = subtask._id
//             ? await SubTask.findById(subtask._id)
//             : null;

//           if (!existingSubtask) {
//             const newSubtask = await SubTask.create({
//               subtask: trimmedName,
//             });

//             await Task.findByIdAndUpdate(
//               prevVal._id,
//               {
//                 $push: { subTasks: newSubtask._id },
//               },
//               { new: true }
//             );
//           }
//         }
//       }
//     }
//   } else {
//     try {
//       const updatedColumn = await Column.findByIdAndUpdate(
//         prevVal.column_id,
//         {
//           $pull: { tasks: prevVal._id },
//         },
//         { new: true }
//       );

//       const currColumn = await Column.findOneAndUpdate(
//         { _id: values.column_id },
//         { $push: { tasks: prevVal._id } },
//         { new: true }
//       );

//       await Task.findByIdAndUpdate(prevVal._id, {
//         column_id: currColumn._id,
//         column_name: currColumn.column_name,
//         description: values.description,
//         title: values.title,
//       });
//     } catch (error) {
//       console.error("Error removing task from column:", error);
//     }
//   }
//   revalidatePath("/");
// };