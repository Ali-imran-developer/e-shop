// import { useState } from "react";
// import { Title, Button, Modal, Input } from "rizzui";
// import { useForm, SubmitHandler } from "react-hook-form";

// interface ModalProps {
//   show: boolean;
//   onClose: () => void;
//   onUpdate?: (updatedDetails: any) => void;
// }

// export default function ImportModal({ 
//   onClose, 
//   show, 
//   onUpdate 
// }: ModalProps) {
//   const [isLoading, setLoading] = useState(false);

//   const { 
//     register, 
//     handleSubmit, 
//     formState: { errors },
//     reset
//   } = useForm<any>({
//     // resolver: zodResolver(),
//     // defaultValues: {
//     //   tags: initialData.tags || ''
//     // }
//   });

//   const onSubmit: SubmitHandler<any> = (data) => {
//     setLoading(true);
//     try {
//       if (onUpdate) {
//         onUpdate(data);
//       }
//       onClose();
//     } catch (error) {
//       console.error('Update failed', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     reset();
//     onClose();
//   };

//   return (
//     <Modal
//       isOpen={show}
//       onClose={handleClose}
//       overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
//       containerClassName="dark:bg-gray-100/90 overflow-hidden dark:backdrop-blur-xl"
//       className="z-[9999]"
//       size="md"
//     >
//       <div className="m-auto p-6">
//         <Title as="h4" className="mb-6 text-lg">
//           Import products by CSV
//         </Title>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="flex flex-col gap-4 text-gray-700">
//             <div className="flex items-center justify-center border rounded-lg py-10">
//               <Button variant="outline">
//                 <Input>
//                   Add File
//                 </Input>
//               </Button>
//             </div>
//             <div className="mt-8 flex justify-end gap-3">
//               <Button 
//                 className="w-auto" 
//                 variant="outline" 
//                 type="button" 
//                 onClick={onClose}
//               >
//                 Cancel
//               </Button>
//               <Button 
//                 type="submit" 
//                 isLoading={isLoading} 
//                 className="w-auto"
//               >
//                 Upload and Preview
//               </Button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// }


import { useState } from "react";
import { Title, Button, Modal } from "rizzui";
import { useForm, SubmitHandler } from "react-hook-form";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onUpdate?: (updatedDetails: any) => void;
}

export default function ImportModal({ onClose, show, onUpdate }: ModalProps) {
  const [isLoading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(null);

  const { handleSubmit, reset } = useForm<any>();

  const onSubmit: SubmitHandler<any> = () => {
    setLoading(true);
    try {
      if (onUpdate) {
        onUpdate(csvData);
      }
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setCsvData([]);
    onClose();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (csvText: string) => {
    const rows = csvText.split("\n");
    const headers = rows[0].split(","); // First row as headers
    const data = rows.slice(1).map((row) => {
      const values = row.split(",");
      return headers.reduce((acc, header, index) => {
        acc[header.trim()] = values[index]?.trim() || "";
        return acc;
      }, {} as Record<string, string>);
    });
    setCsvData(data);
  };

  return (
    <Modal
      isOpen={show}
      onClose={handleClose}
      overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
      containerClassName="dark:bg-gray-100/90 overflow-hidden dark:backdrop-blur-xl"
      className="z-[9999]"
      size="md"
    >
      <div className="m-auto p-6">
        <Title as="h4" className="mb-6 text-lg">Import products by CSV</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 text-gray-700">
            {/* CSV File Upload */}
            <div className="flex flex-col items-center justify-center border rounded-lg py-10">
              <input
                type="file"
                accept=".csv"
                ref={(ref) => setFileInputRef(ref)}
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button variant="outline" onClick={() => fileInputRef?.click()}>
                Add File
              </Button>
            </div>

            {/* Display Parsed CSV Data */}
            {csvData.length > 0 && (
              <div className="border p-4 rounded-lg bg-gray-100">
                <h4 className="font-semibold">Preview Data:</h4>
                <pre className="text-sm">{JSON.stringify(csvData, null, 2)}</pre>
              </div>
            )}

            <div className="mt-8 flex justify-end gap-3">
              <Button className="w-auto" variant="outline" type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isLoading} className="w-auto">
                Upload and Preview
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

