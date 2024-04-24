# 設定 SSH

如果你想要在同一台機器上使用多個 SSH 金鑰，你可以按照以下的步驟來操作：

1. **創建新的 SSH 金鑰**：SSH 金鑰是一種安全的身份驗證方式，它允許你在不需要輸入密碼的情況下連接到遠程主機。你可以使用以下命令來為你的新帳戶創建一個新的 SSH 金鑰：

   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f ~/.ssh/id_rsa_demo # 產生 SSH 金鑰
   ```

2. **啟動 SSH-agent 並添加新的 SSH 金鑰**：SSH-agent 是一種管理 SSH 金鑰的工具，它可以幫助你避免重複輸入密碼。你可以使用以下命令來啟動 SSH-agent 並添加你的新 SSH 金鑰：

   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_rsa_demo
   ```

3. **在 SSH 配置文件中添加新的 Host**：SSH 配置文件允許你為不同的主機或主機組指定不同的設置。你可以使用以下命令來編輯你的 SSH 配置文件：

   ```bash
   nano ~/.ssh/config
   ```

   然後，你可以在文件中添加以下內容：

   ```bash
   # Default GitHub
   Host github.com
     HostName github.com
     User git
     IdentityFile ~/.ssh/id_rsa

   # Other GitHub account
   Host github-demo
     HostName github.com
     User git
     IdentityFile ~/.ssh/id_rsa_demo
   ```

4. **複製 SSH 金鑰到剪貼簿**：這一步將你的公開 SSH 金鑰複製到剪貼簿，以便你可以輕鬆地將它添加到你的 GitHub 帳戶。你可以使用以下命令來複製你的 SSH 金鑰：

   ```bash
   cat ~/.ssh/id_rsa_demo.pub | xclip -selection clipboard
   ```

5. **將 SSH 金鑰添加到你的 GitHub 帳戶**：在這一步，你需要將你的公開 SSH 金鑰添加到你的 GitHub 帳戶。你可以在 GitHub 的設置中找到添加 SSH 金鑰的選項。

6. **測試 SSH 連接**：最後，你應該測試你的 SSH 連接以確保一切都設置正確。你可以使用以下命令來測試你的 SSH 連接：

    ```bash
    ssh -T git@github-demo
    ```

7. **添加遠程倉庫**：你可以使用 `git remote add` 命令來添加一個新的遠程倉庫。例如，如果你想要添加一個名為 `origin` 的遠程倉庫，你可以使用以下命令：

   ```bash
   git remote add origin git@github-demo:username/repo.git
   ```

   這將添加一個新的遠程倉庫，並將其命名為 `origin`。你需要將 `username` 和 `repo.git` 替換為你的 GitHub 用戶名和倉庫名。

8. **移除 SSH 金鑰**：如果你不再需要某個 SSH 金鑰，你可以使用以下命令來移除它：

   ```bash
   ssh-add -d ~/.ssh/id_rsa_demo
   ```

   這將從 SSH-agent 中移除指定的 SSH 金鑰。如果你也想從你的檔案系統中刪除該金鑰，你可以使用 `rm` 命令：

   ```bash
   rm ~/.ssh/id_rsa_demo ~/.ssh/id_rsa_demo.pub
   ```

   請注意，這將永久刪除該 SSH 金鑰，所以請確保你真的不再需要它。
