# signal-cli node.js

## Debian 10

### Instal dependencies as root

```bash
adduser signal-cli

apt install -y build-essential openjdk-11-jre wget curl git

curl -fsSL https://deb.nodesource.com/setup_15.x | bash -
apt-get install -y nodejs

export VERSION="0.8.0"
wget https://github.com/AsamK/signal-cli/releases/download/v"${VERSION}"/signal-cli-"${VERSION}".tar.gz
tar xf signal-cli-"${VERSION}".tar.gz -C /opt
ln -sf /opt/signal-cli-"${VERSION}"/bin/signal-cli /usr/local/bin/
```

### Verify number as signal user

To get the token, go to https://signalcaptchas.org/registration/generate.html
Check the developer tools (F12) console for a failed redirect to signalcaptcha://
Everything after signalcaptcha:// is the captcha token.

```bash
signal-cli -u USERNAME register  --captcha CAPTCHA
signal-cli -u USERNAME verify CODE

# Test connection
signal-cli -u USERNAME send -m "Message" RECIPIENT
```

### Run as root to activate Dbus

```bash
git clone https://github.com/AsamK/signal-cli.git
cd signal-cli
cp data/org.asamk.Signal.conf /etc/dbus-1/system.d/
cp data/org.asamk.Signal.service /usr/share/dbus-1/system-services/
cp data/signal-cli.service /etc/systemd/system/
sed -i -e "s|%dir%|/usr/local|" -e "s|--config /var/lib/signal-cli|-u <RECIPIENT>|" /etc/systemd/system/signal-cli.service
systemctl daemon-reload
systemctl enable signal-cli.service
systemctl reload dbus.service

# Test connection
signal-cli --dbus-system send -m "Message" RECIPIENT
```

### Run simple reply to message

```bash
git clone
npm install
node dbus.js
```
