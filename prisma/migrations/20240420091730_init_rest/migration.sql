-- CreateTable
CREATE TABLE "todo" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deadline" TIMESTAMP(3),
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "created_by" UUID NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo_assignee_user" (
    "todo_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "todo_assignee_user_pkey" PRIMARY KEY ("todo_id","user_id")
);

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user_profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo_assignee_user" ADD CONSTRAINT "todo_assignee_user_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo_assignee_user" ADD CONSTRAINT "todo_assignee_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
