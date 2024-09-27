# official-site

## MY_GITHUB_TOKEN

### 生成 GitHub Personal Access Token

1. 登入 GitHub 並前往 Personal Access Tokens 頁面。
2. 點擊 "Generate new token"。
3. 選擇以下權限：
    * repo: 訪問儲存庫的所有權限，包括讀取和寫入。
    * workflow: 允許觸發和管理 GitHub Actions 工作流程。
    * write:packages: 允許寫入 GitHub Packages。
    * delete:packages: 允許刪除 GitHub Packages（如果你需要在工作流程中刪除包）。
4. 生成 token 並複製它。

### 設置 GitHub Actions Secret

1. 前往 GitHub 儲存庫。
2. 點擊 "Settings"。
3. 在左側菜單中，選擇 "Secrets and variables"，然後點擊 "Actions"。
4. 點擊 "New repository secret"。
5. 設置秘密的名稱為 MY_GITHUB_TOKEN，並將你的個人訪問 token 貼上去。
6. 點擊 "Add secret"。

## SSH_KEY

1. 生成 SSH 密鑰對，並且選擇將密鑰保存為 pcca

    ```bash
    ssh-keygen -t rsa -b 4096 -C "contact@pccaclean.com"

    # Generating public/private rsa key pair.
    # Enter file in which to save the key (/path/.ssh/id_rsa): pcca
    # Enter passphrase (empty for no passphrase):
    # Enter same passphrase again:
    # Your identification has been saved in pcca
    # Your public key has been saved in pcca.pub
    # The key fingerprint is:
    # SHA256:Nbk9YwCL4s7S84z9QHtttoP9Gvd10/1tO4Gs+h+tbro contact@pccaclean.com
    # The key's randomart image is:
    # +---[RSA 4096]----+
    # |        .        |
    # |       . o .     |
    # |    . . . =      |
    # |   . .   . =     |
    # |    . . S . * .  |
    # |   + . . . . =..o|
    # |  . = o .o= o. o*|
    # |   . * o.oo= ooo*|
    # |    . +...=EB+.o=|
    # +----[SHA256]-----+

    ```

2. 查看生成的密鑰
    * 私鑰會保存在你指定的文件中，例如 /path/.ssh/pcca。
    * 公鑰會保存在相同路徑下，文件名為 pcca.pub。

3. 添加 SSH 公鑰到 GitHub

    ```bash
    cat pcca.pub
    ```

    * 打開 pcca.pub 文件，複製其中的內容。
    * 登入 GitHub 並前往 SSH and GPG keys 頁面。
    * 點擊 "New SSH key"。
    * 將公鑰內容貼上，並給它一個描述名稱。
    * 點擊 "Add SSH key"。

4. 添加 SSH 私鑰到 GitHub Secrets

    ```bash
    cat pcca
    ```

    * 打開 pcca 文件，複製其中的內容。
    * 前往你的 GitHub 儲存庫。
    * 點擊 "Settings"。
    * 在左側菜單中，選擇 "Secrets and variables"，然後點擊 "Actions"。
    * 點擊 "New repository secret"。
    * 設置秘密的名稱為 SSH_KEY，並將私鑰內容貼上去。
    * 點擊 "Add secret"。
