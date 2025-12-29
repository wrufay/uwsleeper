import Swal from "sweetalert2";

export const customSwalConfig = {
  customClass: {
    title: "shizuru-regular",
    confirmButton:
      "bg-[var(--goose-yellow)] cursor-pointer text-[var(--aritzia-blue)] py-3 px-6 rounded-full hover:scale-105",
    cancelButton:
      "bg-gray-300 text-gray-800 cursor-pointer py-3 px-6 rounded-full hover:scale-105 ml-2",
    actions: "gap-3 mt-6",
    icon: "border-4 border-[var(--goose-yellow)]",
  },
  buttonsStyling: false,
  showClass: {
    popup: "animate-fade-in",
  },
  allowOutsideClick: false,
};

export const swalVariants = {
  success: (title: string, text?: string) =>
    Swal.fire({
      ...customSwalConfig,
      title,
      html: text?.replace(/\n/g, '<br>'),
      // can remove icon / change
      icon: "success",
      confirmButtonText: "Got it!",
    }),

  error: (title: string, text?: string) =>
    Swal.fire({
      ...customSwalConfig,
      title,
      text,
      icon: "error",
      confirmButtonText: "Okay",
    }),

  warning: (title: string, text?: string) =>
    Swal.fire({
      ...customSwalConfig,
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }),

  info: (title: string, text?: string) =>
    Swal.fire({
      ...customSwalConfig,
      title,
      text,
      icon: "info",
      confirmButtonText: "Cool!",
    }),

  loading: (title: string, text?: string) =>
    Swal.fire({
      ...customSwalConfig,
      title,
      text,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    }),
};
