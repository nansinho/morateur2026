import { useEffect } from "react";

interface DocumentMeta {
  title: string;
  description: string;
}

const useDocumentMeta = ({ title, description }: DocumentMeta) => {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    }
  }, [title, description]);
};

export default useDocumentMeta;
