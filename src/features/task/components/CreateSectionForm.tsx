import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const CreateSectionForm: React.FC = () => {
  return (
    <Button className="!bg-blue-500 text-white rounded cursor-pointer hover:!bg-blue-600 transition duration-150">
      <Plus /> Add Status Section
    </Button>
  );
};

export default CreateSectionForm;
