use tauri::{Manager, Window};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn start_drag(window: Window) {
    window.start_dragging().unwrap();
}

#[tauri::command]
async fn minimize_window(window: Window) {
    window.minimize().unwrap();
}

#[tauri::command]
async fn maximize_window(window: Window) {
    window.maximize().unwrap();
}

#[tauri::command]
async fn unmaximize_window(window: Window) {
    window.unmaximize().unwrap();
}

#[tauri::command]
async fn close_window(window: Window) {
    window.close().unwrap();
}

#[tauri::command]
async fn is_maximized(window: Window) -> bool {
    window.is_maximized().unwrap()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            start_drag,
            minimize_window,
            maximize_window,
            unmaximize_window,
            close_window,
            is_maximized
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
