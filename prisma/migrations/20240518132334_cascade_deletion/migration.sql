-- DropForeignKey
ALTER TABLE "todo" DROP CONSTRAINT "todo_created_by_fkey";

-- DropForeignKey
ALTER TABLE "todo_assignee_user" DROP CONSTRAINT "todo_assignee_user_todo_id_fkey";

-- DropForeignKey
ALTER TABLE "todo_assignee_user" DROP CONSTRAINT "todo_assignee_user_user_id_fkey";

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profile"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo_assignee_user" ADD CONSTRAINT "todo_assignee_user_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo_assignee_user" ADD CONSTRAINT "todo_assignee_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profile"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
