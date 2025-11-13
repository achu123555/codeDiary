// 通用认证功能JavaScript

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化错误提示函数
    const showError = (input, message) => {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        // 如果没有错误提示元素，创建一个
        if (!errorElement) {
            const newErrorElement = document.createElement('div');
            newErrorElement.className = 'error-message';
            newErrorElement.style.color = '#e74c3c';
            newErrorElement.style.fontSize = '12px';
            newErrorElement.style.marginTop = '5px';
            formGroup.appendChild(newErrorElement);
            input.classList.add('error');
        }
        
        // 显示错误信息
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        // 给输入框添加错误样式
        input.classList.add('error');
    };
    
    // 清除错误提示
    const clearError = (input) => {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        
        input.classList.remove('error');
    };
    
    // 密码可见性切换功能
    const setupPasswordToggle = () => {
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        
        passwordInputs.forEach(input => {
            // 检查是否已经有切换按钮
            const formGroup = input.closest('.form-group');
            if (!formGroup.querySelector('.toggle-password')) {
                const toggleBtn = document.createElement('button');
                toggleBtn.type = 'button';
                toggleBtn.className = 'toggle-password';
                toggleBtn.innerHTML = '👁️';
                toggleBtn.style.position = 'absolute';
                toggleBtn.style.right = '10px';
                toggleBtn.style.top = '50%';
                toggleBtn.style.transform = 'translateY(-50%)';
                toggleBtn.style.backgroundColor = 'transparent';
                toggleBtn.style.border = 'none';
                toggleBtn.style.cursor = 'pointer';
                toggleBtn.style.fontSize = '16px';
                
                formGroup.style.position = 'relative';
                formGroup.appendChild(toggleBtn);
                
                toggleBtn.addEventListener('click', function() {
                    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                    input.setAttribute('type', type);
                    this.innerHTML = type === 'password' ? '👁️' : '👁️‍🗨️';
                });
            }
        });
    };
    
    // 验证码倒计时功能
    const setupVerificationCode = () => {
        const sendCodeBtn = document.getElementById('sendCodeBtn');
        
        if (sendCodeBtn) {
            sendCodeBtn.addEventListener('click', function() {
                const mobile = document.getElementById('mobile').value;
                
                // 验证手机号码
                if (!mobile || !/^1[3-9]\d{9}$/.test(mobile)) {
                    showError(document.getElementById('mobile'), '请输入正确的手机号码');
                    return;
                }
                
                // 开始倒计时
                let countdown = 60;
                this.disabled = true;
                this.classList.add('disabled');
                this.textContent = `${countdown}秒后重试`;
                
                const timer = setInterval(() => {
                    countdown--;
                    this.textContent = `${countdown}秒后重试`;
                    
                    if (countdown <= 0) {
                        clearInterval(timer);
                        this.disabled = false;
                        this.classList.remove('disabled');
                        this.textContent = '获取验证码';
                    }
                }, 1000);
                
                // 模拟发送验证码
                console.log('发送验证码到:', mobile);
                
                // 显示提示
                const notification = document.createElement('div');
                notification.className = 'notification success';
                notification.textContent = '验证码已发送（模拟）';
                notification.style.position = 'fixed';
                notification.style.left = '50%';
                notification.style.top = '20px';
                notification.style.transform = 'translateX(-50%)';
                notification.style.backgroundColor = '#2ecc71';
                notification.style.color = 'white';
                notification.style.padding = '10px 20px';
                notification.style.borderRadius = '5px';
                notification.style.zIndex = '9999';
                notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                notification.style.minWidth = '200px';
                notification.style.textAlign = 'center';
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            });
        }
    };
    
    // 密码强度检测
    const setupPasswordStrength = () => {
        const passwordInput = document.getElementById('password');
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        
        if (passwordInput && strengthBar && strengthText) {
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                let strength = 0;
                
                // 密码强度规则
                if (password.length >= 8) strength++;
                if (/[A-Z]/.test(password)) strength++;
                if (/[a-z]/.test(password)) strength++;
                if (/[0-9]/.test(password)) strength++;
                if (/[^A-Za-z0-9]/.test(password)) strength++;
                
                // 更新强度指示器
                strengthBar.className = 'strength-bar';
                
                if (password) {
                    if (strength <= 2) {
                        strengthBar.classList.add('strength-weak');
                        strengthText.textContent = '弱';
                    } else if (strength <= 4) {
                        strengthBar.classList.add('strength-medium');
                        strengthText.textContent = '中';
                    } else {
                        strengthBar.classList.add('strength-strong');
                        strengthText.textContent = '强';
                    }
                } else {
                    strengthText.textContent = '未输入';
                }
            });
        }
    };
    
    // 输入框焦点效果
    const setupInputFocus = () => {
        const inputs = document.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                clearError(this);
            });
            
            input.addEventListener('blur', function() {
                // 根据不同类型的输入框进行验证
                if (this.hasAttribute('required')) {
                    if (!this.value.trim()) {
                        showError(this, '此字段为必填项');
                    }
                }
                
                // 邮箱验证
                if (this.type === 'email' && this.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(this.value)) {
                        showError(this, '请输入有效的邮箱地址');
                    }
                }
                
                // 手机号码验证
                if (this.id === 'mobile' && this.value) {
                    const mobilePattern = /^1[3-9]\d{9}$/;
                    if (!mobilePattern.test(this.value)) {
                        showError(this, '请输入正确的手机号码');
                    }
                }
            });
        });
    };
    
    // 登录表单验证
    const setupLoginForm = () => {
        const loginForm = document.getElementById('loginForm');
        
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                
                const username = document.getElementById('username');
                const password = document.getElementById('password');
                
                // 验证用户名
                if (!username.value.trim()) {
                    showError(username, '请输入用户名');
                    isValid = false;
                }
                
                // 验证密码
                if (!password.value) {
                    showError(password, '请输入密码');
                    isValid = false;
                }
                
                // 如果验证通过，提交表单
                if (isValid) {
                    // 显示加载状态
                    const submitBtn = this.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    submitBtn.disabled = true;
                    submitBtn.textContent = '登录中...';
                    
                    // 模拟登录请求
                    setTimeout(() => {
                        console.log('登录信息:', { username: username.value, password: password.value });
                        
                        // 显示成功提示
                const notification = document.createElement('div');
                notification.className = 'notification success';
                notification.textContent = '登录成功！';
                notification.style.position = 'fixed';
                notification.style.left = '50%';
                notification.style.top = '20px';
                notification.style.transform = 'translateX(-50%)';
                notification.style.backgroundColor = '#2ecc71';
                notification.style.color = 'white';
                notification.style.padding = '10px 20px';
                notification.style.borderRadius = '5px';
                notification.style.zIndex = '9999';
                notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                notification.style.minWidth = '200px';
                notification.style.textAlign = 'center';
                        
                        document.body.appendChild(notification);
                        
                        // 重置按钮状态
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        
                        // 3秒后跳转到首页
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 1500);
                    }, 1500);
                }
            });
        }
    };
    
    // 注册表单验证
    const setupRegisterForm = () => {
        const registerForm = document.getElementById('registerForm');
        
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                let isValid = true;
                
                const username = document.getElementById('username');
                const email = document.getElementById('email');
                const mobile = document.getElementById('mobile');
                const code = document.getElementById('verificationCode');
                const password = document.getElementById('password');
                const confirmPassword = document.getElementById('confirmPassword');
                const agreeTerms = document.getElementById('agreeTerms');
                
                // 验证用户名
                if (!username.value.trim()) {
                    showError(username, '请输入用户名');
                    isValid = false;
                } else if (username.value.length < 3 || username.value.length > 20) {
                    showError(username, '用户名长度应在3-20个字符之间');
                    isValid = false;
                } else if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
                    showError(username, '用户名只能包含字母、数字和下划线');
                    isValid = false;
                }
                
                // 验证邮箱
                if (!email.value.trim()) {
                    showError(email, '请输入邮箱地址');
                    isValid = false;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                    showError(email, '请输入有效的邮箱地址');
                    isValid = false;
                }
                
                // 验证手机号
                if (!mobile.value.trim()) {
                    showError(mobile, '请输入手机号码');
                    isValid = false;
                } else if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
                    showError(mobile, '请输入正确的手机号码');
                    isValid = false;
                }
                
                // 验证验证码
                if (!code.value.trim()) {
                    showError(code, '请输入验证码');
                    isValid = false;
                } else if (code.value.length !== 6 || !/^\d{6}$/.test(code.value)) {
                    showError(code, '请输入6位数字验证码');
                    isValid = false;
                }
                
                // 验证密码
                if (!password.value) {
                    showError(password, '请设置密码');
                    isValid = false;
                } else if (password.value.length < 8) {
                    showError(password, '密码长度至少为8位');
                    isValid = false;
                } else if (!/[A-Za-z]/.test(password.value) || !/[0-9]/.test(password.value)) {
                    showError(password, '密码必须包含字母和数字');
                    isValid = false;
                }
                
                // 验证确认密码
                if (!confirmPassword.value) {
                    showError(confirmPassword, '请再次输入密码');
                    isValid = false;
                } else if (password.value !== confirmPassword.value) {
                    showError(confirmPassword, '两次输入的密码不一致');
                    isValid = false;
                }
                
                // 验证协议同意
                if (!agreeTerms.checked) {
                    const errorElement = document.createElement('div');
                    errorElement.className = 'error-message';
                    errorElement.textContent = '请阅读并同意用户协议和隐私政策';
                    errorElement.style.color = '#e74c3c';
                    errorElement.style.fontSize = '12px';
                    errorElement.style.marginTop = '5px';
                    
                    const termsLabel = agreeTerms.closest('label');
                    termsLabel.parentNode.insertBefore(errorElement, termsLabel.nextSibling);
                    isValid = false;
                }
                
                // 如果验证通过，提交表单
                if (isValid) {
                    // 显示加载状态
                    const submitBtn = this.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    submitBtn.disabled = true;
                    submitBtn.textContent = '注册中...';
                    
                    // 模拟注册请求
                    setTimeout(() => {
                        const registrationData = {
                            username: username.value,
                            email: email.value,
                            mobile: mobile.value,
                            code: code.value,
                            password: password.value
                        };
                        
                        console.log('注册信息:', registrationData);
                        
                        // 显示成功提示
                const notification = document.createElement('div');
                notification.className = 'notification success';
                notification.textContent = '注册成功！';
                notification.style.position = 'fixed';
                notification.style.left = '50%';
                notification.style.top = '20px';
                notification.style.transform = 'translateX(-50%)';
                notification.style.backgroundColor = '#2ecc71';
                notification.style.color = 'white';
                notification.style.padding = '10px 20px';
                notification.style.borderRadius = '5px';
                notification.style.zIndex = '9999';
                notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                notification.style.minWidth = '200px';
                notification.style.textAlign = 'center';
                        
                        document.body.appendChild(notification);
                        
                        // 3秒后跳转到登录页
                        setTimeout(() => {
                            window.location.href = 'login.html';
                        }, 1500);
                    }, 1500);
                }
            });
        }
    };
    
    // 初始化所有功能
    setupPasswordToggle();
    setupVerificationCode();
    setupPasswordStrength();
    setupInputFocus();
    setupLoginForm();
    setupRegisterForm();
});