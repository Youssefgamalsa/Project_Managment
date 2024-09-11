import axios from "axios"
import { baseTasksUrls } from "../../modules/BaseUrls/BaseUrls"
import { motion } from "framer-motion"
import styles from "./Column.module.css"

const Column = ({ title, tasks, onDragStart, onDragOver, onDrop }) => {
  const changeTaskStatus = async (id) => {
    try {
      await axios.put(
        baseTasksUrls.changeTaskStatus(id),
        {
          status:
            title === "To Do"
              ? "ToDo"
              : title === "In Progress"
              ? "InProgress"
              : "Done",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={styles.column}
      onDragOver={onDragOver}
      onDrop={(e) => {
        onDrop(
          e,
          title === "To Do"
            ? "ToDo"
            : title === "In Progress"
            ? "InProgress"
            : "Done"
        )
        console.log({
          itemDropped: title,
          taskId: e.dataTransfer.getData("taskid"),
        })
        changeTaskStatus(e.dataTransfer.getData("taskid"))
      }}
    >
      <h3>{title}</h3>
      <div className={styles.cards}>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            className={`${styles.card} ${styles.draggable}`}
            draggable
            onDragStart={(e) => {
              onDragStart(e, task.id)
              e.dataTransfer.setData("taskid", task.id)
            }}
            initial={{
              scale: 1,
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            }}
            whileHover={{
              scale: 1.02,
              boxShadow:
                "0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)",
            }}
            whileDrag={{
              scale: 1.05,
              boxShadow:
                "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
              zIndex: 1,
              cursor: "grabbing",
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
            }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          >
            {task.title}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Column
