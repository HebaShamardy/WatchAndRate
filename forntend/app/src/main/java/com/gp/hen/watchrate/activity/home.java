package com.gp.hen.watchrate.activity;

import android.app.ActionBar;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.content.Intent;
import android.support.v4.widget.SlidingPaneLayout;
import android.support.v4.widget.SwipeRefreshLayout;
import android.view.LayoutInflater;
import android.view.View;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.DecelerateInterpolator;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.gp.hen.watchrate.Connection;
import com.gp.hen.watchrate.LoadImage;
import com.gp.hen.watchrate.R;
import com.gp.hen.watchrate.model.UserEntity;


import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;

/**
 * Created by esraa ahmed on 11/30/2015.
 */
public class home extends Activity {
    //nyt api=key = 28bcb54b06ae2bb40882d7a5e5dba212:4:74287520
    //http://api.nytimes.com/svc/movies/v2/reviews/?query=taken+3&api-key=28bcb54b06ae2bb40882d7a5e5dba212:4:74287520picks.xmls
    LinearLayout search_content;
    LinearLayout list_View;
    LayoutInflater layoutInflater;
    View search_card;
    View review_card;
    ArrayList movies_id;
    String Url;
    SlidingPaneLayout mSlidingPanel;
    SlidingPanel slide;


    private SwipeRefreshLayout swipeView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        ActionBar ab = getActionBar();
        ab.hide();
        // Url="http://10.0.3.2:8080/Watch_and_Rate";
//        Url ="http://192.168.1.6:8080/Watch_and_Rate";
        Url = "http://watchandrate-fcigp.rhcloud.com";


        // Sliding Panel Layout ( START )
        mSlidingPanel = (SlidingPaneLayout) findViewById(R.id.SlidingPanel);
        mSlidingPanel.setParallaxDistance(200);

        slide = new SlidingPanel();
        slide.setContext(home.this);
        slide.setmSlidingPanel(mSlidingPanel);
        slide.setUser_img((ImageView) findViewById(R.id.slide_user_img));
        slide.setLogout( (Button) findViewById(R.id.logout_btn));
        slide.setHome((Button) findViewById(R.id.home_btn));
        slide.setSetting((Button) findViewById(R.id.settings_btn));
        slide.setMy_review((Button) findViewById(R.id.myreview_btn));
        slide.setAbout((Button) findViewById(R.id.about_btn));
        slide.setProfile((Button) findViewById(R.id.profile_btn));
        slide.setUser_name((TextView) findViewById(R.id.slide_user_name));
        slide.setUser_score((TextView) findViewById(R.id.slide_user_score));
        slide.init();

        ImageButton menu = (ImageButton) findViewById((R.id.menu_btn));

        menu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                mSlidingPanel.openPane();
            }
        });
        // Sliding Panel Layout ( END )

        swipeView = (SwipeRefreshLayout) findViewById(R.id.swipe_view);
        swipeView.setColorSchemeColors(Color.GRAY, Color.GREEN, Color.BLUE,
                Color.RED, Color.BLACK);
        swipeView.setDistanceToTriggerSync(10);// in dips
        swipeView.setSize(SwipeRefreshLayout.DEFAULT);// LARGE also can be used

        swipeView.postDelayed(new Runnable() {
            @Override
            public void run() {
            }
        }, 200);

        movies_id = new ArrayList();
        UserEntity user = UserEntity.getCurrentUser();
        System.out.println(user.getName() + " " + user.getEmail());
        //http://image.tmdb.org/t/p/w300/hO1R1TI429PjkOjby4dTPBrWFwn.jpg
        //http://api.themoviedb.org/3/movie/260346?api_key=23386b0753dd348bcb87ab9f516da5d5
        //The reviews api key (NYT API)
      //  28bcb54b06ae2bb40882d7a5e5dba212:4:74287520

        Animation fadeIn = new AlphaAnimation(0, 1);
        fadeIn.setInterpolator(new DecelerateInterpolator()); //add this
        fadeIn.setDuration(1000);

        Animation fadeOut = new AlphaAnimation(1, 0);
        fadeOut.setInterpolator(new AccelerateInterpolator()); //and this
        fadeOut.setStartOffset(1000);
        fadeOut.setDuration(1000);

        AnimationSet animation = new AnimationSet(false); //change to false
        animation.addAnimation(fadeIn);
        animation.addAnimation(fadeOut);

         layoutInflater = LayoutInflater.from(this);
         search_card = layoutInflater.inflate(R.layout.search_card, null);
         review_card =  layoutInflater.inflate(R.layout.review_card, null);

        list_View = (LinearLayout) findViewById(R.id.searchlistView);
        search_content = (LinearLayout) findViewById(R.id.search_table);
        ImageButton search_btn = (ImageButton) findViewById(R.id.search_btn);
        final Button Search_info_btn = (Button) findViewById(R.id.Search_info_btn);
        final Button Reviews_btn = (Button) findViewById(R.id.Reviews_btn);
        final EditText search_box = (EditText) findViewById(R.id.search_box);
        search_content.setAnimation(animation);
        search_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Search_info_btn.setBackground(getResources().getDrawable(R.drawable.tab_box));
                list_View.removeAllViews();
                search_content.setVisibility(View.VISIBLE);
                Connect conn = new Connect();
                conn.tag = "movie_api";
                String query = "http://api.themoviedb.org/3/search/movie?api_key=23386b0753dd348bcb87ab9f516da5d5&query=" + search_box.getText().toString();
                String query2 = "http://api.themoviedb.org/3/movie/8681/reviews?api_key=23386b0753dd348bcb87ab9f516da5d5";
                query = query.replaceAll(" ", "%20");
                conn.execute(query);
                swipeView.setRefreshing(true);
                swipeView.setEnabled(true);

            }
        });
        Search_info_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                movies_id = new ArrayList();
                Search_info_btn.setBackground(getResources().getDrawable(R.drawable.tab_box));
                Reviews_btn.setBackground(getResources().getDrawable(R.drawable.button_box));
                list_View.removeAllViews();
                search_content.setVisibility(View.VISIBLE);
                Connect conn = new Connect();
                conn.tag = "movie_api";
                String query = "http://api.themoviedb.org/3/search/movie?api_key=23386b0753dd348bcb87ab9f516da5d5&query=" + search_box.getText().toString();
                query = query.replaceAll(" ", "%20");
                conn.execute(query);
                swipeView.setRefreshing(true);
                swipeView.setEnabled(true);

            }
        });
        Reviews_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                movies_id = new ArrayList();
                Search_info_btn.setBackground(getResources().getDrawable(R.drawable.button_box));
                Reviews_btn.setBackground(getResources().getDrawable(R.drawable.tab_box));
                list_View.removeAllViews();
              //  search_content.setVisibility(View.VISIBLE);
             //   Toast.makeText(getApplicationContext(),"not implement yet", Toast.LENGTH_SHORT).show();
                swipeView.setRefreshing(true);
                swipeView.setEnabled( true );

                   Connect conn = new Connect();
                   conn.tag = "review_movie_api";
                   String query = "http://api.themoviedb.org/3/search/movie?api_key=23386b0753dd348bcb87ab9f516da5d5&query=" + search_box.getText().toString();
                   query = query.replaceAll(" ", "%20");
                   conn.execute(query);


            }
        });



    }


    @Override
    public void onBackPressed() {
        if (search_content.getVisibility() == View.VISIBLE) {
            search_content.setVisibility(View.GONE);
        } else {
            super.onBackPressed();
        }


    }

    public class Connect extends AsyncTask<String, Void, Void> {
        String result, data = "", tag = "",mov_name;

        protected Void doInBackground(String... strings) {
            //   System.out.println("dfklsdk;sd");
            result = new Connection().sendrequest(strings[0], data);
            return null;
        }
        // oly en code dh gahz 3shn m7sesh en 7omara :D Asma2 l fun ah bs el content la :v la mo25za wnta 3rft mnnen klam dh
        // search w mtnsesh ane android developer :P aywa 3rfa :3 bs 3rft 7tt api w klam dh mnen wresult l fo2
        // de mesh api d code 3ade bta3 t send request w teget data men server msh dh so2ale ma 3lina  hwa fen code servie

        protected void onPostExecute(Void unused) {
            if (tag.equals("movie_api")||tag.equals("review_movie_api")) {
                System.out.println(result);
                JSONParser parser = new JSONParser();
                Object obj = null;
                try {
                    obj = parser.parse(result);
                    JSONObject data = (JSONObject) obj;
                    result = data.get("results").toString();
                    System.out.println(result);
                    obj = parser.parse(result);
                    JSONArray movies = (JSONArray) obj;
                    for (int i = 0; i < movies.size(); i++) {
                        obj = parser.parse(movies.get(i).toString());
                        JSONObject film = (JSONObject) obj;
                        System.out.println(film.toString());
                        if(tag.equals("review_movie_api")) {
                            movies_id.add(film.get("original_title"));
                            movies_id.add(film.get("id"));
                        }
                        else {
                            addToList(film);
                        }
                    }
                    if(movies.size()==0){
                        Toast.makeText(getApplicationContext(),"no result", Toast.LENGTH_SHORT).show();

                    }

                    if(tag.equals("review_movie_api")){
                        for(int i=0;i<movies_id.size();i++) {
                            Connect conn2 = new Connect();
                            conn2.tag = "review_api";
                            conn2.mov_name =  movies_id.get(i).toString();
                            i++;
                            conn2.execute(Url+"/Search?id="+movies_id.get(i));
                        }
                        if (movies_id.size() == 0) {
                            swipeView.setRefreshing(false);
                            swipeView.setEnabled( false );

                        }
                    }


                } catch (ParseException e) {
                    Toast.makeText(getApplicationContext(), "Error!!, please check network or try again", Toast.LENGTH_SHORT).show();
                    e.printStackTrace();

                }
                if (swipeView.isRefreshing()) {
                    System.out.println("false ");
                    swipeView.setRefreshing(false);
                    swipeView.setEnabled(false);
                }
            }
            if(tag.equals("review_api")){
                System.out.println(result);
                JSONParser parser = new JSONParser();
                Object obj = null;
                try{
                    obj = parser.parse(result);
                    JSONObject data = (JSONObject) obj;
                    result = data.get("results").toString();
                    System.out.println(result);
                    obj = parser.parse(result);
                    JSONArray reviews = (JSONArray) obj;
                    for (int i = 0; i < reviews.size(); i++) {
                        obj = parser.parse(reviews.get(i).toString());
                        JSONObject review = (JSONObject) obj;
                        System.out.println(review.toString());
                        addReviewToList(review,mov_name,i);
                    }
                    if(reviews.size()==0){
                     //   Toast.makeText(getApplicationContext(),"no result", Toast.LENGTH_SHORT).show();

                    }

                }catch (ParseException e) {
                   // Toast.makeText(getApplicationContext(), "Error!!, please check network or try again", Toast.LENGTH_SHORT).show();
                    e.printStackTrace();
                    swipeView.setRefreshing(false);
                    swipeView.setEnabled(false);
                }
                if (swipeView.isRefreshing()) {
                    System.out.println("false ");
                    swipeView.setRefreshing(false);
                    swipeView.setEnabled(false);
                }
            }


        }
    }

    public void addToList(final JSONObject film) {

        search_card.setId(Integer.valueOf(film.get("id").toString()));
        ImageView mov_img = (ImageView) search_card.findViewById(R.id.movie_img);
        TextView mov_title = (TextView) search_card.findViewById(R.id.movie_title);
        TextView mov_year = (TextView) search_card.findViewById(R.id.movie_year);
        TextView vote_count = (TextView) search_card.findViewById(R.id.vote_count);
        TextView vote_avg = (TextView) search_card.findViewById(R.id.vote_avg);
        LoadImage load = new LoadImage();
        load.Image(mov_img);
        load.execute("http://image.tmdb.org/t/p/w300" + film.get("poster_path"));
        mov_title.setText("Title : "+film.get("original_title").toString());
        mov_year.setText("Year : "+film.get("release_date").toString());
        vote_count.setText("vote : "+film.get("vote_count").toString());
        vote_avg.setText("average : "+film.get("vote_average").toString());
                list_View.addView(search_card);
        final String jsonText = film.toJSONString();
        search_card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                System.out.println("hey");
                Intent intent = new Intent(home.this, movie_info.class);
                intent.putExtra("movie",jsonText);
                startActivity(intent);
            }
        });
        search_card = layoutInflater.inflate(R.layout.search_card, null);
    }

    public void addReviewToList(JSONObject review,String mov_name,int index){
        review_card.setId(index);
        TextView mov_title = (TextView) review_card.findViewById(R.id.movie_title);
        TextView rev_author = (TextView) review_card.findViewById(R.id.review_author);
        TextView rev_contnet = (TextView) review_card.findViewById(R.id.review_content);
        mov_title.setText("Title : "+mov_name);
        System.out.println(review.get("author").toString());
        rev_author.setText("Author : "+review.get("author").toString());
        System.out.println(review.get("content").toString());
        rev_contnet.setText("Content : \n" + review.get("content").toString());
        list_View.addView(review_card);
        review_card = layoutInflater.inflate(R.layout.review_card, null);
    }
}
