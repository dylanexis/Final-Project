import csv
import os

# Function to read album data from CSV
def read_albums_from_csv(filename='albums.csv'):
    albums = []
    with open(filename, mode='r', encoding='utf-8') as file:
        reader = csv.reader(file)
        next(reader)  # Skip the header if you have one
        for row in reader:
            album = {
                'album_name': row[0],
                'artist': row[1],
                'genre1': row[2],
                'genre2': row[3],
                'genre3': row[4],
                'genre4': row[5],  # Genres from column 2 to 5
                'release_year': row[6],
                'comments': row[7] if row[7] else "No comments available.",
                'pitchfork_rating': row[8],
                'favorite': row[9],
                'album_image': row[10],  # Image filename
                'album_id': row[11]
            }
            albums.append(album)
    return albums

# Function to generate the HTML content for a single album
def generate_html_for_album(album, output_filename):
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{album['album_name']} - Album Page</title>
        <link rel="stylesheet" href ="../styles/album.css">
        <link rel="stylesheet" href="../styles/reset.css">
    </head>
    <body id="a{album['album_id']}">
      <a class = "skip" href="#main">Skip to Main Content</a>
    <header>
        <nav>
            <h1 class = "home_button">
            <a href="../index.html">Home<a>
            </h1>
        </nav>
    </header>
        <div class="album">
            <img src="../images/covers/{album['album_image']}" alt="{album['album_name']} cover">
            <h1>{album['album_name']}</h1>
            <div class = "artist"> {album['artist']}</div>
            <div class = "genres id = "{album['genre1']}">{album['genre1']}</div>
            <div class = "genres id = "{album['genre2']}">{album['genre2']}</div>
            <div class = "genres id = "{album['genre3']}">{album['genre3']}</div>
            <div class = "genres id = "{album['genre4']}">{album['genre4']}</div>
            <p><strong>Release Year:</strong> {album['release_year']}</p>
        </div>
        <div><p><strong>Pitchfork Rating:</strong> <span class="rating">{album['pitchfork_rating']}</span></p></div>
        <div><p><strong>Favorite Track:</strong> {album['favorite']}</p></div>
            <div class = "comments">
                <p><strong>Comments:</strong> {album['comments']}</p>
            </div>
    </body>
    </html>
    """

    # Write the HTML content to a file
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"HTML file for '{album['album_name']}' has been generated as '{output_filename}'.")

# Main function to read CSV and generate individual HTML files for each album
def main():
    albums = read_albums_from_csv()  # Read album data from CSV
    
    # Ensure the 'albums' directory exists for storing individual album pages
    if not os.path.exists('albums'):
        os.makedirs('albums')

    # Generate an individual HTML page for each album
    for album in albums:
        album_filename = f"albums/{album['album_name'].replace(' ', '_').replace('/', '_')}.html"  # Ensure valid filename
        generate_html_for_album(album, album_filename)

if __name__ == "__main__":
    main()