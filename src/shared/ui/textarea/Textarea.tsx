import type { Ref, TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>;
}

export const Textarea = ({ ref, ...props }: TextareaProps) => (
  <textarea ref={ref} {...props} className={styles.textarea} />
);
