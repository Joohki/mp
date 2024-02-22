import { db } from "@/firebase/firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFetchDocument = (collectionName: string, documentID: string) => {
  const [document, setDocument] = useState<DocumentData | null>(null);

  const getDocument = useCallback(async () => {
    if (!documentID) {
      return;
    }
    const docRef = doc(db, collectionName, documentID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const obj = {
        id: documentID,
        ...docSnap.data(),
      };

      setDocument(obj);
    } else {
      toast.error("Document not found");
    }
  }, [collectionName, documentID]);

  useEffect(() => {
    getDocument();
    return () => {
      setDocument(null);
    };
  }, [collectionName, documentID]);

  return { document };
};

export default useFetchDocument;
