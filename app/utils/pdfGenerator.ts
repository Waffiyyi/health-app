import jsPDF from "jspdf";
import {User, FormData} from "@/app/types";

export function exportSuggestionsToPDF({
                                           user,
                                           formData,
                                           suggestions,
                                       }: {
    user: Partial<User> | null;
    formData: FormData;
    suggestions: string[];
}) {
    if (!suggestions.length) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;

    doc.setFontSize(20).setFont("helvetica", "bold");
    doc.text("Health & Wellness Suggestions", pageWidth / 2, 30, {align: "center"});

    doc.setFontSize(12).setFont("helvetica", "normal");
    doc.text(`Generated for: ${user?.name || "Anonymous User"}`, margin, 50);
    doc.text(`Age: ${formData.age}`, margin, 60);
    doc.text(`Goal: ${formData.goal}`, margin, 70);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, 80);

    doc.setFontSize(14).setFont("helvetica", "bold");
    doc.text("Your Personalized Suggestions:", margin, 100);

    doc.setFontSize(10).setFont("helvetica", "normal");

    let yPosition = 120;
    suggestions.forEach((text, i) => {
        const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
        if (yPosition + lines.length * 6 > 280) {
            doc.addPage();
            yPosition = 30;
        }
        doc.setFont("helvetica", "bold").text(`${i + 1}.`, margin, yPosition);
        doc.setFont("helvetica", "normal").text(lines, margin + 10, yPosition);
        yPosition += lines.length * 6 + 5;
    });

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i).setFontSize(8);
        doc.text(`Health Suggestions App - Page ${i} of ${totalPages}`, pageWidth / 2, doc.internal.pageSize.height - 10, {
            align: "center",
        });
    }

    doc.save(`health-suggestions-${formData.goal.toLowerCase()}-${new Date().toISOString().split("T")[0]}.pdf`);
}
