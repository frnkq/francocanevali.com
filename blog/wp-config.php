<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'francocanevali_blog' );

/** MySQL database username */
define( 'DB_USER', 'wordpress' );

/** MySQL database password */
define( 'DB_PASSWORD', 'frnkquito' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '+D(hr5C.DD%H}QSLXG_Wr<cN,`{=K)drAf_V9^xD4`2/#7PN*C $vn}8_rA&zCff' );
define( 'SECURE_AUTH_KEY',  '&eNFx_?ynH|yZnryg^>13[X`*Vw,dNX++|mT>h6^jg5kV)6-S*^D!0&&CVr^Rr}n' );
define( 'LOGGED_IN_KEY',    'K>fO&QZ6S|8x6PCpiWess}h_%`=Pw*XS|I].i%NB3IhtXY)T[,_jBMlqnSc5?[M^' );
define( 'NONCE_KEY',        'DKVz6U&fo4Zn(97la` Zf]i4kE>4|H&:3t5SPe ]i.(5A4ZTPtK_UM>JQy@4XnA*' );
define( 'AUTH_SALT',        'gr1SE{:ESu=WMDN;pm3|b{G,;ztUYjuRw(/{U|BgA|%>IFOIWh~32<WCOXJH:p z' );
define( 'SECURE_AUTH_SALT', '2dr#`g, 1B`xI)F3W>N_71|vDGY/d_umbkx_x:{PY[46RSxS?De3k_bg&7niyRpa' );
define( 'LOGGED_IN_SALT',   '6(fj|3v*jV03yUR!TbNAl?hQkE:F[2;6OE{wpK2>X! X_3auPH(/d%!(l5pnjqML' );
define( 'NONCE_SALT',       'EzG4F!w_?VMK9vA:D{?`nS:jr.Xa?Q:^=vc0e,F~y5AZS{{z%&0~s)9M,31~O=XN' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

