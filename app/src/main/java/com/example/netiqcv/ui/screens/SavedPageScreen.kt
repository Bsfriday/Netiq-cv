package com.example.netiqcv.ui.screens

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.netiqcv.model.ResumeData
import com.example.netiqcv.service.PdfExporter
import com.example.netiqcv.ui.components.parseHexColor
import com.example.netiqcv.ui.viewmodel.CvViewModel
import com.example.netiqcv.utils.CompletionCalculator
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun SavedPageScreen(
    viewModel: CvViewModel,
    onEditInBuilder: (ResumeData) -> Unit,
    onCreateNew: () -> Unit
) {
    val context = LocalContext.current
    val savedResumes by viewModel.savedResumes.collectAsState()

    var resumeToRename by remember { mutableStateOf<ResumeData?>(null) }
    var renameInput by remember { mutableStateOf("") }
    var resumeToDelete by remember { mutableStateOf<ResumeData?>(null) }

    val dateFormat = remember { SimpleDateFormat("MMM d, yyyy • h:mm a", Locale.getDefault()) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "My Resumes (${savedResumes.size})",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF0F172A)
                )
                Text(
                    text = "Stored securely on your device",
                    fontSize = 11.5.sp,
                    color = Color(0xFF64748B)
                )
            }

            Button(
                onClick = {
                    viewModel.createNewBlankResume()
                    onCreateNew()
                },
                shape = RoundedCornerShape(10.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB)),
                modifier = Modifier.testTag("btn_create_new_saved")
            ) {
                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("New CV", fontSize = 12.5.sp, fontWeight = FontWeight.Bold)
            }
        }

        if (savedResumes.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(64.dp)
                            .background(Color(0xFFEFF6FF), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.FolderOpen, contentDescription = null, tint = Color(0xFF2563EB), modifier = Modifier.size(32.dp))
                    }
                    Text("No saved resumes yet", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = Color(0xFF0F172A))
                    Text("Create a new CV or generate one using the AI tool.", fontSize = 12.5.sp, color = Color(0xFF64748B))
                }
            }
        } else {
            LazyColumn(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                items(savedResumes, key = { it.id }) { cv ->
                    SavedCvItemCard(
                        cv = cv,
                        dateStr = dateFormat.format(Date(cv.updatedAt)),
                        onEdit = {
                            viewModel.setActiveCv(cv)
                            onEditInBuilder(cv)
                        },
                        onDuplicate = {
                            viewModel.duplicateResume(cv.id)
                        },
                        onRename = {
                            resumeToRename = cv
                            renameInput = cv.title
                        },
                        onDelete = {
                            resumeToDelete = cv
                        },
                        onSharePdf = {
                            PdfExporter.sharePdf(context, cv)
                        },
                        onPrint = {
                            PdfExporter.printCv(context, cv)
                        }
                    )
                }
            }
        }
    }

    // Rename Dialog
    resumeToRename?.let { cv ->
        AlertDialog(
            onDismissRequest = { resumeToRename = null },
            title = { Text("Rename Resume") },
            text = {
                OutlinedTextField(
                    value = renameInput,
                    onValueChange = { renameInput = it },
                    label = { Text("Resume Title") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )
            },
            confirmButton = {
                TextButton(
                    onClick = {
                        if (renameInput.isNotBlank()) {
                            viewModel.renameResume(cv.id, renameInput.trim())
                            Toast.makeText(context, "Renamed!", Toast.LENGTH_SHORT).show()
                        }
                        resumeToRename = null
                    }
                ) {
                    Text("Save")
                }
            },
            dismissButton = {
                TextButton(onClick = { resumeToRename = null }) {
                    Text("Cancel")
                }
            }
        )
    }

    // Delete Confirmation Dialog
    resumeToDelete?.let { cv ->
        AlertDialog(
            onDismissRequest = { resumeToDelete = null },
            title = { Text("Delete Resume?") },
            text = { Text("Are you sure you want to delete '${cv.title}'? This action cannot be undone.") },
            confirmButton = {
                TextButton(
                    onClick = {
                        viewModel.deleteResume(cv.id)
                        resumeToDelete = null
                    },
                    colors = ButtonDefaults.textButtonColors(contentColor = Color(0xFFDC2626))
                ) {
                    Text("Delete")
                }
            },
            dismissButton = {
                TextButton(onClick = { resumeToDelete = null }) {
                    Text("Cancel")
                }
            }
        )
    }
}

@Composable
private fun SavedCvItemCard(
    cv: ResumeData,
    dateStr: String,
    onEdit: () -> Unit,
    onDuplicate: () -> Unit,
    onRename: () -> Unit,
    onDelete: () -> Unit,
    onSharePdf: () -> Unit,
    onPrint: () -> Unit
) {
    var showMenu by remember { mutableStateOf(false) }
    val strength = remember(cv) { CompletionCalculator.calculateResumeStrength(cv) }
    val accent = parseHexColor(cv.themeConfig.accentColor)

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .testTag("saved_cv_${cv.id}")
            .clickable { onEdit() },
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        border = CardDefaults.outlinedCardBorder()
    ) {
        Column(
            modifier = Modifier.padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(
                    modifier = Modifier.weight(1f),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(38.dp)
                            .background(accent.copy(alpha = 0.15f), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.Article, contentDescription = null, tint = accent, modifier = Modifier.size(20.dp))
                    }

                    Column {
                        Text(
                            text = cv.title.ifBlank { "Untitled Resume" },
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp,
                            color = Color(0xFF0F172A),
                            maxLines = 1
                        )
                        Text(
                            text = "${cv.personalInfo.fullName.ifBlank { "Candidate" }} • ${cv.personalInfo.jobTitle.ifBlank { "Draft" }}",
                            fontSize = 11.5.sp,
                            color = Color(0xFF475569),
                            maxLines = 1
                        )
                    }
                }

                // Strength Badge & Overflow Menu
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Surface(
                        shape = CircleShape,
                        color = when {
                            strength.score >= 80 -> Color(0xFFDCFCE7)
                            strength.score >= 50 -> Color(0xFFFEF3C7)
                            else -> Color(0xFFFEE2E2)
                        }
                    ) {
                        Text(
                            text = "${strength.score}% Score",
                            fontSize = 10.5.sp,
                            fontWeight = FontWeight.Bold,
                            color = when {
                                strength.score >= 80 -> Color(0xFF166534)
                                strength.score >= 50 -> Color(0xFF92400E)
                                else -> Color(0xFF991B1B)
                            },
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                        )
                    }

                    Box {
                        IconButton(onClick = { showMenu = true }, modifier = Modifier.size(28.dp)) {
                            Icon(Icons.Default.MoreVert, contentDescription = "More actions", tint = Color(0xFF64748B))
                        }
                        DropdownMenu(expanded = showMenu, onDismissRequest = { showMenu = false }) {
                            DropdownMenuItem(
                                text = { Text("Edit in Builder") },
                                leadingIcon = { Icon(Icons.Default.Edit, contentDescription = null) },
                                onClick = { showMenu = false; onEdit() }
                            )
                            DropdownMenuItem(
                                text = { Text("Duplicate") },
                                leadingIcon = { Icon(Icons.Default.ContentCopy, contentDescription = null) },
                                onClick = { showMenu = false; onDuplicate() }
                            )
                            DropdownMenuItem(
                                text = { Text("Rename") },
                                leadingIcon = { Icon(Icons.Default.DriveFileRenameOutline, contentDescription = null) },
                                onClick = { showMenu = false; onRename() }
                            )
                            DropdownMenuItem(
                                text = { Text("Share PDF") },
                                leadingIcon = { Icon(Icons.Default.Share, contentDescription = null) },
                                onClick = { showMenu = false; onSharePdf() }
                            )
                            DropdownMenuItem(
                                text = { Text("Print") },
                                leadingIcon = { Icon(Icons.Default.Print, contentDescription = null) },
                                onClick = { showMenu = false; onPrint() }
                            )
                            HorizontalDivider()
                            DropdownMenuItem(
                                text = { Text("Delete", color = Color(0xFFDC2626)) },
                                leadingIcon = { Icon(Icons.Default.DeleteOutline, contentDescription = null, tint = Color(0xFFDC2626)) },
                                onClick = { showMenu = false; onDelete() }
                            )
                        }
                    }
                }
            }

            // Bottom metadata line
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Updated $dateStr",
                    fontSize = 10.5.sp,
                    color = Color(0xFF94A3B8)
                )

                Surface(
                    shape = RoundedCornerShape(4.dp),
                    color = Color(0xFFF1F5F9)
                ) {
                    Text(
                        text = "${cv.themeConfig.template.uppercase()} • ${cv.themeConfig.font.uppercase()}",
                        fontSize = 9.5.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF475569),
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                    )
                }
            }
        }
    }
}
