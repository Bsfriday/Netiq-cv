package com.example.netiqcv

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.netiqcv.model.ResumeData
import com.example.netiqcv.ui.screens.*
import com.example.netiqcv.ui.theme.NetiqCVTheme
import com.example.netiqcv.ui.viewmodel.CvViewModel

enum class ScreenRoute(val route: String, val label: String, val icon: ImageVector) {
    HOME("home", "Home", Icons.Default.Home),
    AI_GENERATOR("ai_generator", "AI Studio", Icons.Default.AutoAwesome),
    CREATE("create", "CV Builder", Icons.Default.EditNote),
    SAMPLES("samples", "Samples", Icons.Default.CollectionsBookmark),
    SAVED("saved", "My CVs", Icons.Default.FolderSpecial)
}

class MainActivity : ComponentActivity() {

    private val viewModel: CvViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            NetiqCVTheme {
                val navController = rememberNavController()
                val navBackStackEntry by navController.currentBackStackEntryAsState()
                val currentRoute = navBackStackEntry?.destination?.route

                val savedResumes by viewModel.savedResumes.collectAsState()
                val statusMsg by viewModel.statusMessage.collectAsState()
                var prefilledProfessionForAi by remember { mutableStateOf<String?>(null) }

                LaunchedEffect(statusMsg) {
                    statusMsg?.let {
                        Toast.makeText(this@MainActivity, it, Toast.LENGTH_SHORT).show()
                        viewModel.clearStatusMessage()
                    }
                }

                val navigateToBuilderWithCv: (ResumeData) -> Unit = { cv ->
                    viewModel.setActiveCv(cv)
                    navController.navigate(ScreenRoute.CREATE.route) {
                        popUpTo(navController.graph.findStartDestination().id) {
                            saveState = true
                        }
                        launchSingleTop = true
                    }
                }

                val handleCreateNew: () -> Unit = {
                    viewModel.createNewBlankResume()
                    navController.navigate(ScreenRoute.CREATE.route) {
                        popUpTo(navController.graph.findStartDestination().id) {
                            saveState = true
                        }
                        launchSingleTop = true
                    }
                }

                Scaffold(
                    modifier = Modifier.fillMaxSize(),
                    bottomBar = {
                        NavigationBar(
                            containerColor = Color.White,
                            tonalElevation = 6.dp
                        ) {
                            ScreenRoute.entries.forEach { screen ->
                                val selected = currentRoute == screen.route
                                NavigationBarItem(
                                    selected = selected,
                                    onClick = {
                                        if (screen == ScreenRoute.AI_GENERATOR) {
                                            prefilledProfessionForAi = null
                                        }
                                        navController.navigate(screen.route) {
                                            popUpTo(navController.graph.findStartDestination().id) {
                                                saveState = true
                                            }
                                            launchSingleTop = true
                                            restoreState = true
                                        }
                                    },
                                    icon = {
                                        if (screen == ScreenRoute.SAVED && savedResumes.isNotEmpty()) {
                                            BadgedBox(
                                                badge = {
                                                    Badge(containerColor = Color(0xFF2563EB)) {
                                                        Text("${savedResumes.size}")
                                                    }
                                                }
                                            ) {
                                                Icon(screen.icon, contentDescription = screen.label, modifier = Modifier.size(22.dp))
                                            }
                                        } else {
                                            Icon(screen.icon, contentDescription = screen.label, modifier = Modifier.size(22.dp))
                                        }
                                    },
                                    label = {
                                        Text(
                                            text = screen.label,
                                            fontSize = 11.sp,
                                            fontWeight = if (selected) FontWeight.Bold else FontWeight.Normal
                                        )
                                    },
                                    colors = NavigationBarItemDefaults.colors(
                                        selectedIconColor = Color(0xFF2563EB),
                                        selectedTextColor = Color(0xFF2563EB),
                                        indicatorColor = Color(0xFFEFF6FF),
                                        unselectedIconColor = Color(0xFF64748B),
                                        unselectedTextColor = Color(0xFF64748B)
                                    ),
                                    modifier = Modifier.testTag("nav_${screen.route}")
                                )
                            }
                        }
                    }
                ) { innerPadding ->
                    NavHost(
                        navController = navController,
                        startDestination = ScreenRoute.HOME.route,
                        modifier = Modifier.padding(innerPadding)
                    ) {
                        composable(ScreenRoute.HOME.route) {
                            HomeScreen(
                                savedCount = savedResumes.size,
                                onNavigateToAi = {
                                    prefilledProfessionForAi = null
                                    navController.navigate(ScreenRoute.AI_GENERATOR.route)
                                },
                                onNavigateToRobotic = { navController.navigate("robotic_resume") },
                                onNavigateToResumeTypes = { navController.navigate("resume_types") },
                                onNavigateToBuilder = { navController.navigate(ScreenRoute.CREATE.route) },
                                onNavigateToRandom = { navController.navigate("random") },
                                onNavigateToSamples = { navController.navigate(ScreenRoute.SAMPLES.route) },
                                onNavigateToSaved = { navController.navigate(ScreenRoute.SAVED.route) },
                                onCreateNew = handleCreateNew
                            )
                        }

                        composable(ScreenRoute.AI_GENERATOR.route) {
                            AiGeneratorScreen(
                                viewModel = viewModel,
                                onEditInBuilder = navigateToBuilderWithCv,
                                initialProfession = prefilledProfessionForAi
                            )
                        }

                        composable("robotic_resume") {
                            RoboticResumeScreen(
                                viewModel = viewModel,
                                onEditInBuilder = navigateToBuilderWithCv,
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("resume_types") {
                            ResumeTypeSelectionScreen(
                                onSelectDedicatedStudio = { id ->
                                    navController.navigate("robotic_resume")
                                },
                                onSelectProfessionForAi = { profession ->
                                    prefilledProfessionForAi = profession
                                    navController.navigate(ScreenRoute.AI_GENERATOR.route)
                                },
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable(ScreenRoute.CREATE.route) {
                            CreatePageScreen(
                                viewModel = viewModel
                            )
                        }

                        composable("random") {
                            RandomPageScreen(
                                viewModel = viewModel,
                                onEditInBuilder = navigateToBuilderWithCv
                            )
                        }

                        composable(ScreenRoute.SAMPLES.route) {
                            SamplesPageScreen(
                                viewModel = viewModel,
                                onEditInBuilder = navigateToBuilderWithCv
                            )
                        }

                        composable(ScreenRoute.SAVED.route) {
                            SavedPageScreen(
                                viewModel = viewModel,
                                onEditInBuilder = navigateToBuilderWithCv,
                                onCreateNew = handleCreateNew
                            )
                        }
                    }
                }
            }
        }
    }
}
