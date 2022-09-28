package uz.tashkec.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.tashkec.repository.AnswerAndQuestionRepository;
import uz.tashkec.service.AnswerAndQuestionService;
import uz.tashkec.service.dto.AnswerAndQuestionDTO;
import uz.tashkec.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.tashkec.domain.AnswerAndQuestion}.
 */
@RestController
@RequestMapping("/api")
public class AnswerAndQuestionResource {

    private final Logger log = LoggerFactory.getLogger(AnswerAndQuestionResource.class);

    private static final String ENTITY_NAME = "answerAndQuestion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnswerAndQuestionService answerAndQuestionService;

    private final AnswerAndQuestionRepository answerAndQuestionRepository;

    public AnswerAndQuestionResource(
        AnswerAndQuestionService answerAndQuestionService,
        AnswerAndQuestionRepository answerAndQuestionRepository
    ) {
        this.answerAndQuestionService = answerAndQuestionService;
        this.answerAndQuestionRepository = answerAndQuestionRepository;
    }

    /**
     * {@code POST  /answer-and-questions} : Create a new answerAndQuestion.
     *
     * @param answerAndQuestionDTO the answerAndQuestionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new answerAndQuestionDTO, or with status {@code 400 (Bad Request)} if the answerAndQuestion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/answer-and-questions")
    public ResponseEntity<AnswerAndQuestionDTO> createAnswerAndQuestion(@RequestBody AnswerAndQuestionDTO answerAndQuestionDTO)
        throws URISyntaxException {
        log.debug("REST request to save AnswerAndQuestion : {}", answerAndQuestionDTO);
        if (answerAndQuestionDTO.getId() != null) {
            throw new BadRequestAlertException("A new answerAndQuestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AnswerAndQuestionDTO result = answerAndQuestionService.save(answerAndQuestionDTO);
        return ResponseEntity
            .created(new URI("/api/answer-and-questions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /answer-and-questions/:id} : Updates an existing answerAndQuestion.
     *
     * @param id the id of the answerAndQuestionDTO to save.
     * @param answerAndQuestionDTO the answerAndQuestionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated answerAndQuestionDTO,
     * or with status {@code 400 (Bad Request)} if the answerAndQuestionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the answerAndQuestionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/answer-and-questions/{id}")
    public ResponseEntity<AnswerAndQuestionDTO> updateAnswerAndQuestion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AnswerAndQuestionDTO answerAndQuestionDTO
    ) throws URISyntaxException {
        log.debug("REST request to update AnswerAndQuestion : {}, {}", id, answerAndQuestionDTO);
        if (answerAndQuestionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, answerAndQuestionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!answerAndQuestionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AnswerAndQuestionDTO result = answerAndQuestionService.update(answerAndQuestionDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, answerAndQuestionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /answer-and-questions/:id} : Partial updates given fields of an existing answerAndQuestion, field will ignore if it is null
     *
     * @param id the id of the answerAndQuestionDTO to save.
     * @param answerAndQuestionDTO the answerAndQuestionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated answerAndQuestionDTO,
     * or with status {@code 400 (Bad Request)} if the answerAndQuestionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the answerAndQuestionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the answerAndQuestionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/answer-and-questions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AnswerAndQuestionDTO> partialUpdateAnswerAndQuestion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AnswerAndQuestionDTO answerAndQuestionDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update AnswerAndQuestion partially : {}, {}", id, answerAndQuestionDTO);
        if (answerAndQuestionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, answerAndQuestionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!answerAndQuestionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AnswerAndQuestionDTO> result = answerAndQuestionService.partialUpdate(answerAndQuestionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, answerAndQuestionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /answer-and-questions} : get all the answerAndQuestions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of answerAndQuestions in body.
     */
    @GetMapping("/answer-and-questions")
    public List<AnswerAndQuestionDTO> getAllAnswerAndQuestions() {
        log.debug("REST request to get all AnswerAndQuestions");
        return answerAndQuestionService.findAll();
    }

    /**
     * {@code GET  /answer-and-questions/:id} : get the "id" answerAndQuestion.
     *
     * @param id the id of the answerAndQuestionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the answerAndQuestionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/answer-and-questions/{id}")
    public ResponseEntity<AnswerAndQuestionDTO> getAnswerAndQuestion(@PathVariable Long id) {
        log.debug("REST request to get AnswerAndQuestion : {}", id);
        Optional<AnswerAndQuestionDTO> answerAndQuestionDTO = answerAndQuestionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(answerAndQuestionDTO);
    }

    /**
     * {@code DELETE  /answer-and-questions/:id} : delete the "id" answerAndQuestion.
     *
     * @param id the id of the answerAndQuestionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/answer-and-questions/{id}")
    public ResponseEntity<Void> deleteAnswerAndQuestion(@PathVariable Long id) {
        log.debug("REST request to delete AnswerAndQuestion : {}", id);
        answerAndQuestionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
